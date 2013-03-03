(function(jQuery){jQuery.fn.__bind__=jQuery.fn.bind;jQuery.fn.__unbind__=jQuery.fn.unbind;jQuery.fn.__find__=jQuery.fn.find;var hotkeys={version:'0.7.9',override:/keypress|keydown|keyup/g,triggersMap:{},specialKeys:{27:'esc',9:'tab',32:'space',13:'return',8:'backspace',145:'scroll',20:'capslock',144:'numlock',19:'pause',45:'insert',36:'home',46:'del',35:'end',33:'pageup',34:'pagedown',37:'left',38:'up',39:'right',40:'down',109:'-',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',191:'/'},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"},newTrigger:function(type,combi,callback){var result={};result[type]={};result[type][combi]={cb:callback,disableInInput:false};return result;}};hotkeys.specialKeys=jQuery.extend(hotkeys.specialKeys,{96:'0',97:'1',98:'2',99:'3',100:'4',101:'5',102:'6',103:'7',104:'8',105:'9',106:'*',107:'+',109:'-',110:'.',111:'/'});jQuery.fn.find=function(selector){this.query=selector;return jQuery.fn.__find__.apply(this,arguments);};jQuery.fn.unbind=function(type,combi,fn){if(jQuery.isFunction(combi)){fn=combi;combi=null;}
if(combi&&typeof combi==='string'){var selectorId=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();var hkTypes=type.split(' ');for(var x=0;x<hkTypes.length;x++){delete hotkeys.triggersMap[selectorId][hkTypes[x]][combi];}}
return this.__unbind__(type,fn);};jQuery.fn.bind=function(type,data,fn){var handle=type.match(hotkeys.override);if(jQuery.isFunction(data)||!handle){return this.__bind__(type,data,fn);}
else{var result=null,pass2jq=jQuery.trim(type.replace(hotkeys.override,''));if(pass2jq){result=this.__bind__(pass2jq,data,fn);}
if(typeof data==="string"){data={'combi':data};}
if(data.combi){for(var x=0;x<handle.length;x++){var eventType=handle[x];var combi=data.combi.toLowerCase(),trigger=hotkeys.newTrigger(eventType,combi,fn),selectorId=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();trigger[eventType][combi].disableInInput=data.disableInInput;if(!hotkeys.triggersMap[selectorId]){hotkeys.triggersMap[selectorId]=trigger;}
else if(!hotkeys.triggersMap[selectorId][eventType]){hotkeys.triggersMap[selectorId][eventType]=trigger[eventType];}
var mapPoint=hotkeys.triggersMap[selectorId][eventType][combi];if(!mapPoint){hotkeys.triggersMap[selectorId][eventType][combi]=[trigger[eventType][combi]];}
else if(mapPoint.constructor!==Array){hotkeys.triggersMap[selectorId][eventType][combi]=[mapPoint];}
else{hotkeys.triggersMap[selectorId][eventType][combi][mapPoint.length]=trigger[eventType][combi];}
this.each(function(){var jqElem=jQuery(this);if(jqElem.attr('hkId')&&jqElem.attr('hkId')!==selectorId){selectorId=jqElem.attr('hkId')+";"+selectorId;}
jqElem.attr('hkId',selectorId);});result=this.__bind__(handle.join(' '),data,hotkeys.handler)}}
return result;}};hotkeys.findElement=function(elem){if(!jQuery(elem).attr('hkId')){if(jQuery.browser.opera||jQuery.browser.safari){while(!jQuery(elem).attr('hkId')&&elem.parentNode){elem=elem.parentNode;}}}
return elem;};hotkeys.handler=function(event){var target=hotkeys.findElement(event.currentTarget),jTarget=jQuery(target),ids=jTarget.attr('hkId');if(ids){ids=ids.split(';');var code=event.which,type=event.type,special=hotkeys.specialKeys[code],character=!special&&String.fromCharCode(code).toLowerCase(),shift=event.shiftKey,ctrl=event.ctrlKey,alt=event.altKey||event.originalEvent.altKey,mapPoint=null;for(var x=0;x<ids.length;x++){if(hotkeys.triggersMap[ids[x]][type]){mapPoint=hotkeys.triggersMap[ids[x]][type];break;}}
if(mapPoint){var trigger;if(!shift&&!ctrl&&!alt){trigger=mapPoint[special]||(character&&mapPoint[character]);}
else{var modif='';if(alt)modif+='alt+';if(ctrl)modif+='ctrl+';if(shift)modif+='shift+';trigger=mapPoint[modif+special];if(!trigger){if(character){trigger=mapPoint[modif+character]||mapPoint[modif+hotkeys.shiftNums[character]]||(modif==='shift+'&&mapPoint[hotkeys.shiftNums[character]]);}}}
if(trigger){var result=false;for(var x=0;x<trigger.length;x++){if(trigger[x].disableInInput){var elem=jQuery(event.target);if(jTarget.is("input")||jTarget.is("textarea")||jTarget.is("select")||elem.is("input")||elem.is("textarea")||elem.is("select")){return true;}}
result=result||trigger[x].cb.apply(this,[event]);}
return result;}}}};window.hotkeys=hotkeys;return jQuery;})(jQuery);


var moustachio = "";

var tag = "";
var scrol = 900;
var time = 42000;



var routeUrl = function(url) {
  url = url.split("/");
  if (url.length === 2) {
		var tag = url[1];
		return tag;
  }
  if (url[1] == "ll") {
    instagram.locationSearch(url[2],url[3], function(){instacat.scroll();});
    return false;
  }
  if (url.length === 1) return "";
  
  return false;
  
}



$(function(){

	
	
	//instagram.tagSearch('cat');
	if (!instagram.access_token()) {
		instagram.login();
	}
	else {
				
		var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    var today = dd+'/'+mm+'/'+yyyy;
 
		if (window.location.hash) {
			tag = window.location.hash.replace('#','');
			$('#input').val(tag);
		}
		
		var tagTest = routeUrl(window.location.pathname);
		if (tagTest !== false) {
		  tag = tagTest;
		} else {
		  tag = false;
		}
		
		
		
		if (tag === "") {
			tag = "photooftheday";
		}
		
	   if (today === "04/05/2012" && tag === "photooftheday") {
      tag = "searchigstarwarsproject";
    }
		
		
		if (tag === "faces") {
		  moustachio= "http://mustachify.me/?src=";
    }
    
    if (tag === "teststarwars") {
      tag = "searchigstarwarsproject"
    }
    
    //tag = tag.replace("Censored", "Olympics");
    
    if (tag === "teststarwars") {
      tag = "searchigstarwarsproject"
    }
        

    if (tag === "searchigstarwarsproject") {
      $('#pictures').width(1500);
      
    // $('#pictures').addClass("starwars");
      
      var $audio = $('<audio/>');
      $audio.attr("src","empire.mp3");
      //$('body').append($audio);
      $audio[0].play();
      
      var t = setTimeout(function() {

        var $audio2 = $("<audio/>");
        $audio2.attr("src", "darth.mp3");
        $audio2[0].play();
      }, 280000);
      
      var t2 = setTimeout(function() {
        window.location = "http://searchinstagram.com/#maythefourth";
      }, 350000);
      
    }
				
		if (tag !== false) {
		  mpmetrics.track(tag);
		  instagram.tagSearch(tag,function(){instacat.scroll();});
		}
	}
	
	
	
	
	
	$('#hash_form').submit(function() {
	
		var tag = $('#hash_input').val();
		
		window.history.pushState({},"","/"+tag);
		
		//window.location.hash = tag;
		mpmetrics.track(tag);
		
	  mpmetrics.track(tag);
		instagram.tagSearch(tag,function(){instacat.scroll();});
		return false;
	})
	
	
	
	
	function getLonLat(address, callback) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?sensor=true&address="+address+"&callback=?";
    alert(url);
    $.getJSON(url, function(data) {
      callback(data);
      alert("hi");
    })
	}
	
	
	https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&client_id=e9f7eb8ef02d47838b642a0c42e9acf0
	
	updateUrlLocation = function(long, lat) {
    window.history.pushState({}, "", "/ll/"+lat+"/"+long);
	 
    mpmetrics.track("/ll/"+lat+"/"+long);

	}
	
	
	
	$('#location_form').submit(function(e) {
	 e.preventDefault();
	   
	  
	
		var location = $('#location_input').val();
	
		window.history.pushState({},"",tag);
		
		//window.location.hash = tag;
	  mpmetrics.track(tag);
		instagram.tagSearch(tag,function(){instacat.scroll();});
		return false;
	})
	
	
	
	
	
	$('#trends nav a').live('click',function() {
	
    return true;
	});
	
	
		
	
	var $stop = $('<a class="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stop stream</a>');
	$stop.click(function() {
	 var $pics = $('#pictures');
	 $pics.stop();
	 $start.show();
	 var top = $pics.offset().top;
	 top = parseInt(0-top);
	 $pics.css('top',0);
	 $pics.css('position','relative');
	 $('html,body').css('overflow-y','auto');
	 $('html,body').scrollTop(top);
	 $stop.hide();
	});
	
	var $start = $('<a class="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart stream</a>');
	$start.click(function() {
	 instacat.scroll();
	 $stop.show();
	 var top = $('body').scrollTop();
	 top = 0 - top;
	 $('html,body').scrollTop(0).css('overflow-y','hidden');

	 $('#pictures').css('position','absolute').offset({top:top,left:0});

	 $start.hide();
	});
	
  
  $start.css('cursor','pointer');
  $stop.css('cursor','pointer');
  	
	$start.hide();
	
	$('h1').append($stop).append($start);
	
	
	$(window).scroll(function(e) {
    if ($('body').scrollTop() + 900 > $('body').height()) {
      instagram.tagSearch.nextPage();
    }
	})
	
var listening = true;

$('input').focus(function() {
  listening = false;
}).blur(function(){
  listening = true;
});

	$(document).bind('keydown', function(e) {
	 if (!listening)
	   return;
	
	 switch (e.keyCode) {
	   case 72 : // h
	       show_help();
	     break;
	   case 83 : // s
	       show_suggested();
	     break;
	   case 81 : // q
	     $('#input').focus();
	     break;
	   case 80 : // p	      
    	 if ($start.is(':visible')) {
    	   $start.click();
    	 }
    	 else {
    	   $stop.click();
    	 }
    	 break;
	   case 191 : // /
	     if (e.shiftKey === true) // ?
	       show_help();
	     break; 
	   case 188 : // ,
	     if (e.shiftKey === true) // <
	       instacat.slowDown();
	     break;
	   case 190 : // .
	     if (e.shiftKey === true) // >
	       instacat.speedUp();
	     break;

	 }

	
	
	});
	
	$('#help').hide();
	
	
		$('body').animate({opacity:1},500);



  $.getJSON('/suggestions.json',function(data) {
    for (i in data) {
      instacat.addTrend(data[i]);
    }
  })
  
  
  var width = $(document).width();
  if (width <= 1050) {
    window.title = "Search IGram";
  }
  
});



	
	/*
	$(document).bind('keydown',  'h', function() {
	 console.log('help');
    show_help();
  });
  console.log('hi');

  $(document).bind('keydown',  'q', function() {
	   $('#input').focus();
  });
  
  $(document).bind('keydown',  's', function() {
	   show_suggested();
  });
  */
	
	function show_help() {
	   var $help = $('#help');
	   if ($help.is(':visible')) {
	     $help.slideUp();
	   }else {
	     $help.slideDown();
	   }
	   	 
	}
	
	function show_suggested() {
	
	   var $trends = $('#trends');
	   if ($trends.is(':visible')) {
	     $trends.fadeOut();
	   }else {
	     $trends.fadeIn();
	   }
	 
	}


instacat = {};

instacat.loader = function() {
	var div = $('<div id="loading">');
	
			
	return div;
	
}


var scrolling = true
var $pics;

instacat.addTrend = function(str) {
  $('#trends nav').append('<li><a href="'+str+'">'+str+'</a></li>')
}

instacat.speedUp = function() {
  time -= 20000;
  if (time < 10000) {
    time += 20000;
    return;
  }

  $('#pictures').stop();
  instacat.scroll();
}

instacat.slowDown = function() {
  time += 20000;
  
  $('#pictures').stop();
  instacat.scroll();
}

instacat.scroll = function() {
  if (!scrolling)
    return;
    
	instagram.tagSearch.nextPage();
	var $pics = $('#pictures');
	$pics.animate({top:$pics.offset().top-scrol}, time,'linear',function() {
		
		instacat.scroll();
	});
}

instacat.loading = instacat.loader();

instacat.loadNow = function() {
	//$('#pictures').append(instacat.loading);	

}

instacat.loaded = function() {
	instacat.loading.remove();
}


instacat.renderImage = function(data) {
	var div = $('<article/>'),
		img = $('<img/>'),
		options = $('<aside/>');
	
	div.addClass('instacat');
	
	var $user = $('<span class="user"/>'),
		$avatar = $('<span class="avatar"/>'),
		$rating = $('<span class="rating"/>'),
		$date = $('<span class="date"/>'),
		$link = $('<span class="link"/>'),
		$caption = $('<span class="caption"/>');
	
	$user.html(data.user.username);
	
	
	
	
	$avatar.html("<img src='"+data.user.profile_picture+"' />");
	
	$avatar.attr('title',data.user.username);
	
	$rating.html(data.likes.count);
	$date.html(tools.relativeTime(data.created_time*1000));
	$link.html(data.link);
	
	if (data.link) {
		div.addClass('clickable');
		div.click(function() {
			mpmetrics.track("view single");
			window.open('/single.php?id='+data.id);
		})
	}
	
	
	if (data.caption) {	
		$caption.html(data.caption.text);
  }
	else
		$caption.html('&nbsp;');	
		
	if (tag == "searchigstarwarsproject") {
    $caption.html("May the 4th be with you");
    $date.html("May 4th 2012");
    $rating.hide();
	}
	
	options
//		.append($user)
		.append($avatar)
		.append($rating)
		.append($date)
//		.append($link)
		.append($caption);
		
	div.append(img).append(options);	
	img.attr('src',moustachio+data.images.low_resolution.url);
	img.bind('load',function() {
		$(this).animate({opacity:1},2000);
	})
	
	$('#pictures').append(div);
}


















instagram = {};
instagram.api = {
	client_id: 'e9f7eb8ef02d47838b642a0c42e9acf0',
	client_secret: 'xxxxxxx',
	access_token: '',
	url: function(url,param) {
	   
    if (url.indexOf("?") >= 0) {
		  return "https://api.instagram.com/v1/"+url+"&client_id="+instagram.api.client_id+"&access_token="+instagram.api.access_token+"&"+param+"&callback=?";
    } else {
		  return "https://api.instagram.com/v1/"+url+"?client_id="+instagram.api.client_id+"&access_token="+instagram.api.access_token+"&"+param+"&callback=?";
	  }
	
	}
};

instagram.searchPage = 1;
instagram.nextPageUrl = "";
instagram.previousUrl = "";





instagram.tagSearch = function(tag,callback) {
	
  instagram.clearSearch();
//	instagram.nextPageUrl = instagram.api.url('locations/788029/media/recent');

	instagram.nextPageUrl = instagram.api.url('tags/'+tag+'/media/recent');

	instagram.tagSearch.nextPage(callback);
}

instagram.locationSearch = function(lat, lng, callback) {
  instagram.clearSearch();
	instagram.nextPageUrl = instagram.api.url('media/search?lat='+lat+"&lng="+lng+"&distance=5000");
	instagram.tagSearch.nextPage(callback);
}

instagram.clearSearch = function() {
  var $pics = $('#pictures');
  $pics.stop();
  $pics.html('').css('top',0);
}

instagram.tagSearch.nextPage = function(callback) {
	instacat.loadNow();
	instagram.api.execute(instagram.nextPageUrl,function(data) {
		$('#notice').fadeOut();
	
		instacat.loaded();
		for (i in data.data) {
			instacat.renderImage(data.data[i]);
		}
		console.log(data);
		if (data.pagination !== undefined) {
		  instagram.nextPageUrl = data.pagination.next_url+"&callback=?";
		} else {
		  instagram.nextPageUrl = instagram.nextPageUrl+"&max_timestamp="+(data.data[data.data.length-1].created_time-1);
		}
		if (typeof callback === "function") {
			callback();
		}
	})
}

instagram.api.execute = function(url,callback) {
	if (url == instagram.previousUrl)
		return;
	instagram.previousUrl = url;
	$.getJSON(url,function(data) {
		if (typeof callback === "function") {
			callback(data);
		}
	})
}

instagram.login = function() {
//	window.location = "https://instagram.com/oauth/authorize/?client_id="+instagram.api.client_id+"&redirect_uri="+window.location+"&response_type=token";
}

instagram.access_token = function() {
	return true;
	var hash = window.location.hash;
	var token = hash.replace('#access_token=','');
	if (hash !== token) {

		instagram.api.access_token = token;
		return true;
	}
	return false;
}


function getFromCurrentLocation() {
 if ($('html').hasClass("geolocation")) {
    navigator.geolocation.getCurrentPosition(function(data) {
      var ll = data.coords;
      
      updateUrlLocation(ll.longitude, ll.latitude);
      
      instagram.locationSearch(ll.latitude,ll.longitude, function(){instacat.scroll();});
   
     
    });
  }
}


$(document).ready(function() {
  
  if (!$('html').hasClass("geolocation")) {
    $('#search_nav').hide();
  }
  
  $('#search_nav a').click(function(e) {
    $('#search_nav .active').removeClass("active");

    $('.search-form.active').removeClass("active");
    $(this).parent().addClass("active");
    $($(this).attr('href')).addClass("active");
    if ($(this).attr("href") === "#location_form") {
      getFromCurrentLocation();
    }
    e.preventDefault();
  })
})

