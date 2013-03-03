/*
	Author: kabookaboo Marketing
*/

function shareOnFacebook(){
    var fbURL = window.location;
    window.open("http://www.facebook.com/share.php?u=" + fbURL, "", "width=700,height=500,status=yes,toolbar=no,menubar=no")
}
function shareOnTwitter(){
    var twURL = window.location;
    window.open("http://twitter.com/home?status=Check this out at " + twURL, "", "status=yes,toolbar=yes,menubar=yes,scrollbars=yes")
}
function MM_openBrWindow(theURL,winName,features){
    window.open(theURL,winName,features);
}



