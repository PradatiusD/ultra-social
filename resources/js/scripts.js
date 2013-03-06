/* GLOBAL VARS
-----------------------------------*/
var instagramTag = 'ultra15';
var twitterTag = 'ultra15';


window.hash = window.location.hash; // Get hashtag from url
hash = hash.substring(1); // remove #

if(hash.length < 1) hash = instagramTag;

console.log('hash is '+hash);

var idArray = new Array();
	
	
function getQueryString(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));}
	

function shareOnFacebook(){
    var fbURL = window.location;
    window.open("http://www.facebook.com/share.php?u=" + fbURL, "", "width=700,height=500,status=yes,toolbar=no,menubar=no")}

function shareOnTwitter(){
    var twURL = window.location;
    window.open("http://twitter.com/home?status=Check this out at " + twURL, "", "status=yes,toolbar=yes,menubar=yes,scrollbars=yes")}


/* INSTAGRAM API FUNCTION
-----------------------------------*/
function instragramFeed(){
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/tags/"+hash+"/media/recent?access_token=245766481.ad88685.66f172256d1c4bc8a0437e42af59c422",
		success: function(data){
			var $instagram = $('.instagram'), // Set instagram div element
				totalImages = data.data.length; // Get total number of images in the feed
			console.log('totalimages is '+totalImages);
			//console.log(data)
			for (var i = 0; i < totalImages; i++){
				if(data.data[i] == "undefined") break;
				var imageThumb = data.data[i].images.thumbnail.url,
					imageURL = data.data[i].images.standard_resolution.url,
					startChar = imageURL.indexOf("com/")+4,
					endChar = imageURL.indexOf("_"),
					imageID = imageURL.slice(startChar,endChar)
					imageLink =  data.data[i].link
					$hiddenField = $('#goodIDs');
					//console.log(data);
					//console.log(data.data[i].caption.text);
				idArray.push(imageURL);
				$("#instagram").append("<div class='item'><a href='" + imageLink + "'><img id='" + imageID + "' src='" + imageThumb +"' class='instagram-image' /></a></div>");
				/*
				if($.inArray(imageID, idArray) == -1) $(".instagram").append("<img id='" + imageID + "' src='" + imageURL +"' class='instagram-image' />");
				*/
				$hiddenField.val($hiddenField.val() + ',' + imageURL);
			}
			console.log(idArray);
			
			windowHeight = $(window).height(), // Get window height
		// Get height of instagram image feed wrapper
		// Math is: totalImages x ( (image height / images per row) + total border height)
		instagramHeight = Math.abs(((totalImages*636)+8)/3),
		endHeight = Math.abs(instagramHeight - windowHeight), // Get height of when the last image reaches the bottom of the window
		// Set speed from top to bottom based on total number of images
		speed = Math.ceil((totalImages * 1000)/.4);
		
		$instagram.fadeIn(800, function(){
			
	 
			setColumns();
		})
			/*$instagram.fadeIn(800).animate({'margin-top':-endHeight},speed,'linear',function(){ // Animate image scroll up
				$instagram.fadeOut(800,function(){ // Fade out when end of feed
					$('.instagram-image').remove();
					$instagram.css({'margin-top':0});
					loadXML();
					var columns    = 3,
						setColumns = function() { columns = $( window ).width() > 640 ? 3 : $( window ).width() > 320 ? 2 : 1; };
				 
					setColumns();
					$( window ).resize( setColumns );
				 
					
					//location.reload();
				});
			})*/
			
		}
	});

	
};

$(function(){
	
	$("a.twitter").pageslide();
	
	//INITIATE jTWEETSANYWHERE FOR TWITTER FEED	
	$('#twitter').jTweetsAnywhere({
		searchParams: ['q=%23'+twitterTag],
		count: 20,
		showTweetFeed: {
			showProfileImages: true,
			showUserScreenNames: true,
			showUserFullNames: true,
			showActionReply: true,
			showActionRetweet: true,
			showActionFavorite: true,
			autoConformToTwitterStyleguide: true,
	showTimestamp: {
		refreshInterval: 15
	},
	autorefresh: {
		mode: 'trigger-insert',
		interval: 30
	},
	paging: { mode: 'more' }
		},
		showTweetBox: {
			label: '<span style="color: #303030">Spread the word ...</span>'
		}
	});
	
	//INITIATE INSTAGRAM FEED
	instragramFeed();
	
	//HANDLER FOR CLICKING ON AN IMAGE AND TAKING YOU TO THE INSTAGRAM WEBSITE
	$('.instagram-image').live("click", function(){
		var imageURL = $(this).attr('src').replace('_5.jpg', '_7.jpg');
		console.log(imageURL);
		
		if($(this).hasClass('flagged')){
			idArray.push(imageURL);
			$(this).removeClass('flagged');
		} else {
			idArray = $.grep(idArray, function(value) {
				return value != imageURL;
			});
			$(this).addClass('flagged');
		}
	});
});