// =====================
// GENERIC FUNCTIONS
// =====================

// MAKE STRING INTO CSS CLASS NAME
function strToClass(str) {
	return str.replace(/\s+/g, '-').toLowerCase();
}

function returnParamValue(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&#]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  return regex.exec(window.location.href);
}

function getParameterByName(name) {
	var results = returnParamValue(name);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setParameterByName(name, value) {
	var results = returnParamValue(name);
	if (results) {
		window.location.search = 	window.location.hash.replace(results[0], "&"+name+"="+value);	
	} else {
		window.location.search = 	window.location.hash + "&"+ name+"="+value;		
	}
}

function objFromArray(chunks, spliter) {
	var obj = new Object;
	for(var prop in chunks){ 
		val=chunks[prop]; 
		var key = val.split(spliter)[0];
		var val = val.split(spliter)[1];
		if (typeof(val) == Object) {
			obj[key] = objFromArray(chunks, spliter);
		} else if ((key != "" && key != undefined) && (val != undefined && val != "")) {
			obj[key] = val;
		}
	}
	return obj;
}

function serializeObj(obj, joinStr, delimiterStr) {
	var str = "";
	for(var prop in obj){ 
		str += prop + joinStr + obj[prop] + delimiterStr;
	}
	return str;
}

function checkQuery() {
	var qs = getQueryString();
	if (qs != undefined) {
		checkAnchor(qs[0].replace('html', ''));
	}
}

function getQueryString() {
 return location.search.replace( '?', '' ).split( '&' );
}

function occurrences(string, substring) {
    var n=0;
    var pos=0;
    while(true){
        pos=string.indexOf(substring,pos);
        if(pos!=-1){ n++; pos+=substring.length;}
        else{break;}
    }
    return(n);
}

function lenCheck(item, add) {
	if (add != undefined && add.length < 1){ add = ""; }
	return (item != undefined && item.length > 0) ? item + add : "";
}

function getScrollXY(offSetFromTop) {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) { //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) { //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) { //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY +offSetFromTop];
}

function positionFromTop(classOrIdRef, offSetFromTop) {
	var scrOfXY = [0, 0];
	scrOfXY = getScrollXY(offSetFromTop);
	$(classOrIdRef).offset({left:scrOfXY[0], top:0});
	var scrOfY = (scrOfXY[1] < 0) ? -scrOfXY[1]+"px" : scrOfXY[1]+"px";
	$(classOrIdRef).css("top", scrOfY)
}

function toTitleCase(str) {
	console.log(str);
	var words=str.split(/\W+/);
	str = "";
	console.log(words);
	if (words.length>0) {
		for(var i=-1,len=words.length;i++<len-1;) {
			console.log(i);
			console.log (words[i]);
			var txt = words[i];
			if (txt != "and" && txt != "the" && txt != "of" && txt != "a" && txt != "an") {
				str = str + " " + txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();		
			} else {
				str = str + " " + txt;
			}
		}
		return str;
	} else {
		return str;
	}
//    return str.replace(/\w\S*/g, function(txt){
/*		var val = ""; 
		if (txt != "and" && txt != "the" && txt != "of") {
			val =  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		} else {
			val = txt;
		}
		return val;
	}	);
*/
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

// ========================
// END GENERIC FUNCTIONS
// ========================

// ========================
// NAVIGATION FUNCTIONS
// ========================

function showCategory(catRef) {
	if ($("#menu ul li").attr("id") != "nav-hide-map") {
		$("#menu ul li.active").removeClass("active");
		$("#footer").html("");
		$("#"+catRef).addClass("active");

		theCat = $("#"+catRef).attr("rel");
		$("#list-of-regions li").removeClass("active");
		$("#nav-all-regions").addClass("active");
		// HIDE/DISPLAY LIST INFORMATION 
		for (category in catColorArr) {			
			var lowerCat = strToClass(category);
			if (strToClass(theCat) != lowerCat && theCat != "All")  {
				$("."+lowerCat).hide();
			} else {
				$("."+lowerCat).show();
			}
		}
		$(".categoryheader").hide();
		if (theCat == "All") {
			$(".categoryheader").show();
			//document.title = pageTitle;
		} else {
			$(".categoryheader."+strToClass(theCat)).show();
   			//document.title = pageTitle + " | " + toTitleCase($("#"+catRef).attr("rel").replace(/\-/g,' '));
		}
		$('html, body').animate({scrollTop: '0px'}, 300);
		// RESET THE MAP TO SHOW ITEMS FROM THIS CATEGORY ONLY
		var regRef = (theCat == "All") ? "all" : "";
		//resetMap(theCat, regRef);
	}

}

function showRegion(regRef) {
	// RESET CATEGORY NAV
	$("#menu ul li").removeClass("active");
	$("#nav-all").addClass("active");
	$("#footer").html("");

	// RESET REGIONS NAV / ADD ACTIVE CLASS TO CLICKED ITEM
	$("#list-of-regions li.active").removeClass("active");
	$("#"+regRef).addClass("active");

	// SHOW ALL CATEGORY HEADERS
	$(".categoryheader").show();

	// SHOW ALL ITEMS IN LIST VIEW
	if ($("#"+regRef).attr("rel") == "all") {
		$(".matwItem").show();
		//document.title = pageTitle;
	// SHOW ONLY MATCHING CLASSES
	} else {
		$(".matwItem").hide();
		$("."+$("#"+regRef).attr("rel")).show();
		//showHideCategoryHeader("."+$("#"+regRef).attr("rel"));
   		//document.title = pageTitle + " | " + toTitleCase($("#"+regRef).attr("rel").replace(/-/g,' '));  
	}
	
	// RESET THE MAP TO SHOW ITEMS FROM THIS REGION ONLY
	if ($("#"+regRef).attr("rel") != "all") {
		//resetMap("", $("#"+regRef).attr("rel"));	
	} else {
		//resetMap("All", "all");			
	}
}

// ========================
// END NAVIGATION FUNCTIONS
// ========================

function appendAnchorToURL(name, value){
	//console.log("appendAnchorToURL");
	//if (window.location.hostname.indexOf("webcmsdev") > -1)  alert("appendAnchorToURL - " + name + " = " + value);
	
	// GET EXISITING HASH
	var chunks = window.location.search.replace("?", "").split("&");
	
	// CREATE OBJECT
	var search = objFromArray(chunks, "=");
	
	// REMOVE PROPERTIES WHERE NEEDED
	if (name == "showCategory") { delete search.page; } //delete search.showRegion;
	if (name == "showRegion") { delete search.page; } //delete search.showCategory;
	
	// CHECK NAME / VALUE VARS AND UPDATE HASH
	if (name != undefined && value != undefined) {
		search[name] = value;
		var newsearch =serializeObj(search, "=", "&");
		window.location.search = newsearch;
	} else if (name != undefined) {
		search[name] = "";
		var newsearch = serializeObj(search, "=", "&");
		//window.location.search = newsearch;
	} else {
		//window.location.search = "";
	}
}

function checkAnchor(hash) {
	
	//if (window.location.hostname.indexOf("webcmsdev") > -1)  alert("checkAnchor" + hash);
	$("#popupListHolder").hide();
	$("#lightBox").hide()
	if (hash.indexOf("showHideMap") > -1) {
		showHideMap(getParameterByName("showHideMap"));
	}
	if (hash.indexOf("page") > -1) {
		if(getParameterByName("page").length > 0) {
			readyToShowItem(getParameterByName("page")+".html");
		} else {
			resetDiv();
		}
	} else if (hash.indexOf("showCategory") > -1) {
		$("#noContentRegion").hide(); 
		showCategory(getParameterByName("showCategory"));
	} else if (hash.indexOf("showRegion") > -1) {
		if (getParameterByName("showRegion").Length > 0) {
			showRegion(getParameterByName("showRegion"));
		}
	}
}


// ================================
// MAP FUNCTIONS
// ================================

function makeMapPointClickable(marker, markerList) {
	// ADD CLICK ACTION TO EACH MAP POINT //var zoomLevel = map.getZoom(); //var startLat = map.getCenter().lat(); //var startLng = map.getCenter().lng();
	google.maps.event.addListener(marker, 'click', function() {
		linkToMATWItemCount[marker.id] = 0;
		linkToMATWItems[marker.id] = "";
		for (var i = 1; i < markerList.length; i++) {
			
			if (markerList[i] != undefined && marker.title == markerList[i].title) {
				if (markerList[i] === undefined || linkToMATWItems[marker.id].indexOf("popupList"+markerList[i].id) == -1) {
					linkToMATWItems[marker.id] += createPopUpList(markerList[i]);
					linkToMATWItemCount[marker.id] ++;
				}
			}
			
		}
		makePopUpVisible(marker, linkToMATWItemCount, linkToMATWItems);
	})		
}

function makePopUpVisible(marker, linkToMATWItemCount, linkToMATWItems) {
	if (linkToMATWItemCount[marker.id] > 1) {
		$("#popupList").html("<div class='popupHeader'><span class='closeItem'>x</span>"+marker.city+", "+marker.country+"</div><div class='popupHeaderList'>"+" "+linkToMATWItems[marker.id]+"</div><div class='clear'></div><div class=\"popupFooter\"><div class=\"popupFooterLogo\"><img src='./small-met-logo.png' /></div><div class=\"popupFooterMATW\">The Met Around the World</div></div>");
		$("#popupListHolder").slideDown(100);
		theCat =  $("#menu ul li.active").attr("rel");
		//alert(theCat);
		//$(".popupList").show();

		// HIDE CATEGORIES THAT ARE IN THE SAME LOCATION BUT NOT SELECTED.
		if (theCat != "All" && theCat !="") {
			$(".popupListHolder").hide();
			var divRef = $(".popupList."+strToClass(theCat));
			$(divRef).show();
			if ($(divRef).size() == 1) { 
				readyToShowItem($(divRef).attr("id").replace("popupList", "")+".html");
				//appendAnchorToURL("page", $(this).attr("id").replace("popupList", ""));
			}
		}
		
		if ($(divRef).size() !=1) { 
			$("#popupListHolder").show(); 
			$(".popupList").click(function() {
				//document.title = pageTitle + " | " + $(this).attr("ref");  
				appendAnchorToURL("page", $(this).attr("id").replace("popupList", ""));
				readyToShowItem($(this).attr("id").replace("popupList", "")+".html");
			})
					
			$(".closeItem").click(function() {
				closePopupListAndLightbox();
				//checkClick("page", "");
				$("#popupListHolder").hide();
			})
		}
		
	} else {
		window.location = "./?page=" + marker.id;
   		//document.title = pageTitle + " | " + marker.titleStr;  
		appendAnchorToURL("page", marker.id);
		$(".closeItem").click(function() {
			//document.title = pageTitle;
			//$("#footer").html("");
			$("#footer").hide();  
				checkClick("page", "");

		});
	}
}

function createPopUpList(marker){
	var returnStr = "";
	returnStr += "<p class='popupList "+ strToClass(marker.category) +"' id='popupList"+marker.id+"' ref='"+marker.titleStr+"' >";
	returnStr += "<span class='popupListCategory'>"+marker.category+"</span>" +marker.titleStr;
	returnStr += "</p>\n";
	return returnStr;
}

function colorCheck(value, theCatRef) {
	if (theCatRef == "All" || theCatRef == "all" || theCatRef == "") {
		var categoryCheck = 0;
		for (var prop in catColorArr) {
			if (prop != value.category) {
				categoryCheck = (multipleRef[strToClass(value.city+value.country)].indexOf(strToClass(prop)) != -1) ? categoryCheck+1 : categoryCheck;
			}
		} 
		return (categoryCheck > 0) ? catColorArr["multiple"] : catColorArr[value.category];
	} else {
		return (occurrences(multipleRef[strToClass(value.city+value.country)], strToClass(value.category)+"-") > 1) ? catColorArr[value.category] : catColorArr[value.category];
	}
}

// ================================
// END MAP FUNCTIONS
// ================================

function readyToShowItem(page) {
	//alert("readyToShowItem");
	//appendAnchorToURL("page", page.replace(".html", ""));
	positionFromTop($("#footer"), itemOffsetFromTop);
	$("#footer").load(page);
	$("#lightBox").show();
	$("#footer").show();

}

function closePopupListAndLightbox(){
	closePopupList();	
	//$("#lightBox").hide();
}
function closePopupList(){
	$("#popupListHolder").slideUp(300);  
	//$("#popupList").html("");		
}






// ================================
// EXTERNAL CONTENT FUNCTIONS
// ================================

function runObjScripts(){
	//document.title = pageTitle + " | " + $(".popupText .title").html();	

	// Run this AFTER the content is loaded in
	imageIterator();
	//$(".closeItem").click(function() {
	//	resetDiv();
	//})
}

function imageIterator() {
	$("#total-count").html($(".imageHolder ul li").size());
		//console.log("imageIterator" + $(".imageHolder ul li").size());
		
	var items = $('.imageHolder li');
		for (var i=0;i<items.length;i++) {
			if (i == 0) { 
				 $(items[i]).addClass("largeImage"); 
			}
			var x= i + 1;
			items[i].id = "largeImage"+x;
		}
		var currentImage = 1;
		var lastImage = $(".imageHolder li").size();
			if(currentImage ==1){
				$(".arrow-left").hide();
			}else{
				$(".arrow-left").show();
			}
			if(lastImage == 1){
				$(".image-counter").hide();
				$(".arrow-right").hide();

			}
		var currentImage = 1;
		var lastImage = $(".imageHolder li").size();
		if(lastImage > 1){
			$(".arrow-left").show();

		}
		$(".arrow-holder .arrow").click(function(){
			if($(this).hasClass("arrow-left")){ currentImage = currentImage-1; } else { currentImage = currentImage+1; }
			if(currentImage < 1){ currentImage = $(".imageHolder li").size(); }
			if(currentImage > $(".imageHolder li").size()){ currentImage = 1; }
			$(".largeImage").removeClass("largeImage");
			$("#largeImage"+currentImage).addClass("largeImage");
			$("#current-count").html(currentImage);
		})
		$("#previous-image-arrow").click(function(){
			whichObjOpen = whichObjOpen-1;
			if(whichObjOpen < 1) { whichObjOpen = $("#grid-menu .thumb").size(); }
			imageIterator();
		});
		//if ($(".imageHolder li").size() === 0) { console.log($(".imageHolder li").size()); $(".image-counter").hide(); }
		
}
function resetDiv() {
	appendAnchorToURL("page", "");
	//document.title = pageTitle;
	$("#footer").html("");
	$("#footer").hide(); 
	$("#lightBox").hide();		
	$("#popupListHolder").hide();
	//appendAnchorToURL("page", "");
}

// ================================
// END EXTERNAL CONTENT FUNCTIONS
// ================================



// ========================
// GLOBALS
// ========================

// CATEGORY / COLOR ARRAY
// KEY = CATEGORY NAME
// VALUE = COLOR IMAGE NAME

var catColorArr = new Array();
	catColorArr['Excavations'] = "./art/red-dot.png";
	catColorArr['Conservation'] = "./art/fuschia-dot.png";
	catColorArr['Exchanges and Collaborations'] = "./art/purple-dot.png";
	catColorArr['Fellowships'] = "./art/green-dot.png";
	catColorArr['Traveling Works of Art'] = "./art/blue-dot.png";
	catColorArr['Traveling Exhibitions'] = "./art/burgundy-dot.png";
	catColorArr['multiple'] = "./art/multiple-dot.png";
	
var itemOffsetFromTop = 50;
var listOffsetFromTop = 150;

var pageTitle = document.title;
var markerList = [];
var linkToMATWItemCount = new Array();
var linkToMATWItemCount = new Array();
var multipleRef = new Array();
var linkToMATWItems = new Array();

var map;
var theCat = "All";
var theReg = "all";
var hashArr = new Array();
var docReadyCheck = "";

// ========================
// END GLOBALS
// ========================

/*
/* NOT IN USE - REMOVED FOR V 2.0
*/
/*
function loadPageElement(newItem) {
	for (var i = 0; i < markerList.length; i++) {
		if (markerList[i].id == newItem.replace("list", "")) {
			makePopUpVisible(markerList[i], linkToMATWItemCount, linkToMATWItems);
		}
	}	
}


function showHideMap(state) {
	$('html, body').animate({scrollTop: '0px'}, 500);
	if(state == "true"){
		$("#nav-hide-map").removeClass("list-view");
		$("#mapHolder").slideDown("fast");
		//resetMap($("#menu ul li.active").attr("rel"), $("#list-of-regions ul li.active").attr("rel"));	
		$("#mapOnOff").html("Hide Map");
	} else {
		$("#nav-hide-map").addClass("list-view");
		$("#mapHolder").slideUp("fast");
		//resetMap($("#menu ul li.active").attr("rel"), $("#list-of-regions ul li.active").attr("rel"));	
		$("#mapOnOff").html("Show Map");
	}
}

function resetMap(theCatRef, theRegRef) { 
	//alert("theCatRef="+theCatRef+", theRegRef="+theRegRef);
	//  HIDE/DISPLAY MAP MARKERS
	theRegRef = getParameterByName("showRegion");
	
	if (theCatRef == "") theCatRef = getParameterByName("showCategory");

	for(var i=0; i<markerList.length; i++) {
			
		var value = markerList[i];

		if (value.category == theCatRef && value.region == theRegRef){
			value.setMap(map);
			var colorRef = colorCheck(value, theCatRef);
			value.setIcon(colorRef);
		} else if (theCatRef != "" && value.category == theCatRef && theCatRef != "All"){
			alert('asdf');
			value.setMap(map);
			value.setIcon(catColorArr[value.category]);
		} else if (theRegRef != "" && value.region == theRegRef && theRegRef != "all"){
			value.setMap(map);
			var colorRef = colorCheck(value, theCatRef);
			value.setIcon(colorRef);
		} else if (theRegRef == "all" && theCatRef == "All"){
			alert('asdfasdf');
			value.setMap(map);
			var colorRef = colorCheck(value, theCatRef);
			value.setIcon(colorRef);
		} else {
			alert('asdfasdf');
			value.setMap(null);
		}
	}
	
}
/*
function showHideCategoryHeader(classRef){
	for (category in catColorArr) {			
		var lowerCat = strToClass(category);
		if ($(classRef+"."+lowerCat).size() === 0) {
			$(".categoryheader."+lowerCat).hide();
		} else {
			$(".categoryheader."+lowerCat).show();
		}
		if ($(classRef).size() === 0) { 
			$("#noContentRegion").show(); 
		} else { 
			$("#noContentRegion").hide(); 
		}
	}	
}
*/






/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);
