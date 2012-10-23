// =====================
// MAP CONFIGURATION
// =====================

var latlng = new google.maps.LatLng(24,0);
var myLatlng = new google.maps.LatLng(-34.397, 150.644);
var infoBoxList = [];
var currentlyOpen=0;
var markerList;
var my_map_ID = "matw-map";

var stylez = [
{
  featureType: "water",
  elementType: "all",
  visibility: "on",
  stylers: [{ hue: "#00b2ff" },{ saturation: -52 }]
},
{
  featureType: "landscape",
  elementType: "all",
  visibility: "off",
  stylers: [{ hue: "#666666" },{ saturation: -40 },{ lightness: 0}]
},
{
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{ visibility: "off" }]
},

{
  featureType: "administrative.country",
  elementType: "all",
  stylers: [{ visibility: "on" }]
},
{
  featureType: "administrative.country",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "administrative.locality",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "administrative.province",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "administrative.land_parcel",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "administrative.neighborhood",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "poi",
  elementType: "all",
  stylers: [{ visibility: "off" },{ hue:"#666666" }, { saturation: -40 },{ lightness: 0}]
},
{
  featureType: "water",
  elementType: "labels",
  stylers: [{ visibility: "off" }]
},
{
  featureType: "road",
  elementType: "all",
  stylers: [{ visibility: "off" }]
}
];

var mapOptions = {
	zoom: 2,
	center: latlng,
	mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, my_map_ID] },
	mapTypeId: my_map_ID,
	scrollwheel: false,
	mapTypeControl: false,
	maxZoom: 7,
	minZoom: 2,
	panControl: false,
	streetViewControl: false,
	zoomControl:true,
	zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.RIGHT_TOP }
  };

// =====================
// END MAP CONFIGURATION
// =====================




// ================================
// DOCUMENT LOAD / MAP CONFIGS
// ================================
var today = new Date();

$(document).ready(function(){
	if (docReadyCheck === "") {
		
		checkQuery();
		var qs = getQueryString();
		//console.log();
		if (qs > 0) {
			$("#mapHolder").hide();
		}
		
		// MAP ICON
		$("#nav-hide-map").hover(function(){
			$("#mapOnOff").toggle();
		});
		
		// CATEGORY NAVIGATION AND MAP ICON
		$("#menu ul li").click(function(){
			//CATEGORY NAV
			if ($(this).attr("id") != "nav-hide-map") {
				appendAnchorToURL("showCategory", $(this).attr("id"));
				//checkClick("showCategory", $(this).attr("id"), $(this));
			} else {
			// HIDE SHOW MAP ICON
				//appendAnchorToURL("showHideMap", $(this).hasClass("list-view"));
				//checkClick("showHideMap", $(this).hasClass("list-view"), $(this));		
			}
			closePopupList();
		});
		$("#lightBox").click(function(){
			resetDiv();
		});
		// ACTIVATE REGIONS NAVIGATION
		$("#list-of-regions li").click(function(){
			appendAnchorToURL("showRegion", $(this).attr("id"));
			//checkClick("showRegion", $(this).attr("id"), $(this));
		})
	
		// TOGGLE VISIBILITY OF CATEGORY DESCRIPTIONS
		$('#readMore').css("background-image", "url(./art/plusminus.png)");  
		var spritePos = Array("-24px", "0px"); 
		$('#readMore').css("background-position", spritePos[1]);  
		$("#aboutMatw, #categoryInfo").click(function(){
			$("#categoryInfo").slideToggle("fast");
			var spriteArrayRef = $("#readMore").css("background-position").split(" ").indexOf(spritePos[0]) + 1;
			$('#readMore').css("background-position", spritePos[spriteArrayRef] + " 0");  
		})
		
		// GOOGLE MAPS LOAD AND CONFIG
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		var styledMapOptions = { name: "matw-map" };
		var matwMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
		map.mapTypes.set(my_map_ID, matwMapType);
	
		// SET AND RESET REGION AND CATEGORY REFS
		theRegRef = getParameterByName("showRegion").replace(/nav-/g, "");
		theRegRef = (theRegRef != "" && theRegRef != "all-regions") ? theRegRef : "" ;
		
		theCatRef = getParameterByName("showCategory").replace(/nav-/g, "");
		theCatRef = (theCatRef != "" && theCatRef != "all") ? theCatRef : "";
		theCatRef = (theCatRef === "works") ? "traveling-works-of-art" : theCatRef;
		theCatRef = (theCatRef === "collaborations") ? "exchanges-and-collaborations" : theCatRef;
		theCatRef = (theCatRef === "exhibitions") ? "traveling-exhibitions" : theCatRef;
		//showRegion(theRegRef);

	//  JSON
	
		//READ JSON FILE
		$.getJSON('matw.json', function(data) {
			var ProjInfo = data[0].ProjectInfo;		
			var keepTrack = 0;
			var marker;
			
			// BUILD MULTIPLE COLOR ARRAY
			$.each(ProjInfo, function(i, item){
				if (multipleRef[strToClass(item.city+item.country)] == undefined) {
					multipleRef[strToClass(item.city+item.country)] = "";
				}
				multipleRef[strToClass(item.city+item.country)] += strToClass(item.Category)+"-"+item.ID+", ";
			});
			
		
			$.each(ProjInfo, function(i, item){
					// CREATE COMPLETE RECORD
					var countries = "";
					
					// MAP ELEMENTS / TEXT DIVS AND MARKERS / REUSING LIST VIEW DATA WITH ADDITION OF CLOSE DIV
					// MAP MARKERS
					keepTrack++;
					
					// CHECK EXPIRATION DATE BEFORE DOT DISPLAY
					var dateExpire = new Date();
					var dateItems = item.dateExpire.split("/");
					dateExpire.setFullYear(dateItems[2], dateItems[0]-1, dateItems[1]);
					
					if (dateExpire > today) {
						if ((item.region.toLowerCase().replace(/ /g, "-") === theRegRef || theRegRef === "") && (item.Category.toLowerCase().replace(/ /g, "-") === theCatRef || theCatRef === "")) {
							marker = new google.maps.Marker({
								position: new google.maps.LatLng(item.lat, item.long),
								lat: item.lat,
								lng: item.long,
								map: map,
								titleStr: item.Title,
								categoryID: item.CategoryID,	
								category: item.Category,
								region: strToClass(item.region),
								country: item.country,
								city: item.city,
								keepTrack:i,
								id: item.ID
							});
							
							if (getParameterByName("page") === "") {
								makeMapPointClickable(marker,  markerList);
								// SET MAP ICON IMAGE
								marker.setTitle(item.city+", "+item.country);
								marker.setIcon(colorCheck(marker, theCatRef));
							}
						}
					}
					markerList[i] = marker;
			});
			// CLOSE LOCATIONS LOOP
			// ADD ITEMS TO LIST VIEW		
		})
		// CLOSE FOR EACH LOOP
		//END JSON
		$(".bottomContent").delay(800, "myQueue").queue("myQueue", function(){ 
			$(".matwItem").click(function() {
				var page = $(this).attr("id").replace("ID", "");
				//readyToShowItem(page+".html");
				appendAnchorToURL("page", page);
			});
			$("#creditLink").click(function() {
				readyToShowItem("credits.html");
			});
	
		}).dequeue("myQueue");
		//resetMap("All", "");
		jQuery(window).bind( 'hashchange', function(e) {
			//alert('ready2');
			var hash = location.hash;
			if (hash === "#" || hash === "") {
				resetDiv();
			} else if (hash != "" && hash.indexOf("list") == -1) { 
				checkAnchor(hash);
			}
		});
	}
	docReadyCheck = "ready";
	//if (window.location.hash.indexOf("showCategory") < 0 ) appendAnchorToURL("showCategory", "nav-all");

// MAKE LIST OF REGIONS A DROPDOWN
	$('#matwNav').dropDownReplacement({
	  	'inputRef'	: '#formInput',
      	'ulListRef'	: '#list-of-regions',
		'ulAttrVal' : 'html', 
      	'speed'	: '500'
	});
	
// MAKE LIST OF CATEGORIES A DROPDOWN
	$('#matwNav').dropDownReplacement({
	  	'inputRef'	: '#formInput2',
      	'ulListRef'	: '#categories',
		'ulAttrVal' : 'html', 
      	'speed'	: '500'
	});
	
	if (theRegRef != "") {
		var temp  = theRegRef.replace(/-/g, " ");
		$('#formInput').val(toTitleCase(temp));
		$('#formInput').addClass("inputActive");
	}
	if (theCatRef != "") {
		$('#formInput2').val(toTitleCase(theCatRef.replace(/-/g, " ")));
		$('#formInput2').addClass("inputActive");
	}
	//resetMap($("#formInput").val(), $("#formInput2").val());
	
	// HIDE EXPIRED ITEMS
	$(".matwItem").each(function (i) {
		var dateExpire = new Date();
		if ($(this).attr("rel") != undefined) {
			var dateItems =$(this).attr("rel").split("/");
			dateExpire.setFullYear(dateItems[2], dateItems[0]-1, dateItems[1]);

			if (dateExpire < today) {
				$(this).hide();
			}
		}
	});


	// HIDE/DISPLAY LIST INFORMATION 
	//var category;
	var catColorArr = new Array();
		catColorArr['Traveling Exhibitions'] = "./art/burgundy-dot.png";
		catColorArr['Traveling Works of Art'] = "./art/blue-dot.png";
		catColorArr['Conservation'] = "./art/fuschia-dot.png";
		catColorArr['Excavations'] = "./art/red-dot.png";
		catColorArr['Fellowships'] = "./art/green-dot.png";
		catColorArr['Exchanges and Collaborations'] = "./art/purple-dot.png";
		catColorArr['multiple'] = "./art/multiple-dot.png";
		
	// SHOW ONLY ITEMS IN MATCHING REGION / LIST VIEW
	if (theRegRef != "")  {
		$(".matwItem").hide();
		$("."+theRegRef).show();
	}
	// HIDE NON MATCHING CATEGORIES / LIST VIEW
	if (theRegRef != "" && theCatRef != "") {
		$(".matwItem").hide();
		$("."+theRegRef).show();
		for (var category in catColorArr) {
			var lowerCat = strToClass(category);
			if (strToClass(theCatRef) != lowerCat) {
				$("."+lowerCat).hide();
			}
		}			
	}
	// HIDE NON MATCHING CATEGORIES / LIST VIEW
	if (theRegRef == "" && theCatRef != "") {
		for (var category in catColorArr) {
			var lowerCat = strToClass(category);
			if (strToClass(theCatRef) != lowerCat) {
				$("."+lowerCat).hide();
			}
		}			
	}
	
	if ($(".popupText .title").html() || getParameterByName("page") == "credits") {
		//popupTitle = $(".popupText .title").html();
	} else {
		var theRegTitle = "";
		if (theRegRef) {
			 theRegTitle = toTitleCase(theRegRef).replace(/-/g, " ") + " | ";
		}
		var theCatTitle = "";
		if (theCatRef) {
			theCatTitle =  toTitleCase(theCatRef).replace(/-/g, " ") + " | ";
		}
		document.title = theRegTitle + theCatTitle + "The Met Around the World | The Metropolitan Museum of Art";
	}
});

// ================================
// END DOCUMENT LOAD / MAP CONFIGS
// ================================

