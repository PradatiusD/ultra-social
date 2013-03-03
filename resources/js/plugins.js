
// usage: log('inside coolFunc', this, arguments);
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/*CLASSES
---------------------------------------------------------
*/

/*

*/
function ieBeforeAfter(object, version) {
	//Object must be in CSS Selector style
	if (version == 7){
		if ($.browser.msie && $.browser.version <= 7) {
			$(".quotables p").after("<div class='before'></div>");
			$(".quotables p").before("<div class='after'></div>");
		}
	}
	if (version == 8){
		if ($.browser.msie && $.browser.version <= 8) {
			$("span.tasting_panel").before("<div class='after'></div>");
			$("span.tasting_panel").after("<div class='before'></div>");
		}
	}
}