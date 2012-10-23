
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<meta name="description" content="The Met Around the World presents the Met’s work via the global scope of its collections and as it extends across the nation and the world through a variety of domestic and international initiatives and programs, including exhibitions, excavations, fellowships, professional exchanges, conservation projects, and traveling works of art." /> 
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/Javascript" src="./js/jquery.js"></script>              
<script type="text/Javascript" src="./js/matw_stat3.js"></script>   
<script type="text/Javascript" src="./js/jquery.dropDownReplacement.js"></script> 
<link rel="stylesheet" href="style.css" type="text/css" media="screen" charset="utf-8"></link>
<link rel="stylesheet" href="include-styles.css" type="text/css" media="screen" charset="utf-8"></link>
<link rel="stylesheet" href="met-global-988.css" type="text/css" media="screen" charset="utf-8"></link>
<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="ie.css" />
<![endif]-->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27192567-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
	<div id="header">
		<div class="global-met-wrap">
			<ul id="met-small-nav">
				<li id="met-logo"><a href="http://www.metmuseum.org/"></a></li>
				<li id="met-visit"><a href="/visit">Visit</a></li>
				<li id="met-exhibitions"><a href="/exhibitions">Exhibitions</a></li>
				<li id="met-collection"><a href="/collections">Collections</a></li>
				<li id="met-events"><a href="/events">Events</a></li>
				<li id="met-learn"><a href="/learn">Learn</a></li>
				<li id="met-research"><a href="/research">Research</a></li>
				<li id="met-give"><a href="/give-and-join">Give and Join</a></li>
				<li id="met-about"><a href="/about-the-museum">About the Museum</a></li>
				<li id="met-shop"><a href="http://store.metmuseum.org">Shop</a></li>
				<li id="met-search"><a href="/search-results">Search</a></li>
			</ul>
		</div>
	</div>
	<div id="topNav">
		<div id="title">
			<div id="mainTitle">
				<a href="./">The Met Around the World</a>
			</div>
			<div id="matwNav">
				<div id="regMenu">
					<input type="text" value="Select a region" id="formInput" name="category" class="input"/>
					<ul id="list-of-regions">
						<li rel="all" id="nav-all-regions">All</li>
						<li rel="africa" id="nav-africa">Africa</li>
						<li rel="asia" id="nav-asia">Asia</li>
						<li rel="australia-and-oceania" id="nav-australia-and-oceania">Australia &amp; Oceania</li>
						<li rel="europe" id="nav-europe">Europe</li>
						<li rel="latin-america-and-the-caribbean" id="nav-latin-america">Latin America &amp; the Caribbean</li>
						<li rel="middle-east" id="nav-middle-east">Middle East</li>
						<li rel="north-america" id="nav-north-america">North America</li>
					</ul>
				</div>
				<div id="menu">
					<input type="text" value="Select a category" id="formInput2" name="category" class="input"/>
						<ul id="categories">
							<li rel="All" id="nav-all" class="active">All</li>
							<li rel="Traveling Exhibitions" id="nav-exhibitions">Traveling Exhibitions</li>						
							<li rel="Traveling Works of Art" id="nav-works">Traveling Works of Art</li>
							<li rel="Conservation" id="nav-conservation">Conservation</li>
							<li rel="Excavations" id="nav-excavations">Excavations</li>
							<li rel="Fellowships" id="nav-fellowships">Fellowships</li>
							<li rel="Exchanges and Collaborations" id="nav-collaborations">Exchanges &amp; Collaborations</li>
						</ul>
				</div>
			</div>
			
		</div>
	</div>
	<div class="clear"></div>
	<div class="mainContentHolder">
			<div id="mapHolder">
			  <div id="map_canvas"></div>
				  <div id="mapKey">
						<ul id='mapKeyImages'>
							<li><span><img src="art/burgundy-dot.png" alt="Traveling Exhibitions" /></span> Traveling Exhibitions</li>
							<li><span><img src="art/blue-dot.png" alt="Traveling Works of Art" /></span> Traveling Works of Art</li>
							<li><span><img src="art/fuschia-dot.png" alt="Conservation" /></span> Conservation</li>
							<li><span><img src="art/red-dot.png" alt="Excavations" /></span> Excavations</li>
							<li><span><img src="art/green-dot.png" alt="Fellowships" /></span> Fellowships</li>
							<li><span><img src="art/purple-dot.png" alt="Exchanges &amp; Collaborations" /></span> Exchanges &amp; Collaborations</li>
							<li><span><img src="art/multiple-dot.png" alt="Multiple Categories" /></span> Multiple Items</li>
						</ul>
				  </div>
			</div>
	
	<div class="clear"></div>
			<div id="infoArea" class="siteWidth">
				<div id="aboutMatw">
					<div id="aboutMatwHeader"><div id="readMore"></div>&nbsp;&nbsp;&nbsp;&nbsp;About The Met Around the World</div>
				</div>
		
				<div id="categoryInfo">
					<div id="aboutText">
						<div id="aboutTextArea">
							<p>The Met Around the World presents the Met’s work via the global scope of its collections and as it extends across the nation and the world through a variety of domestic and international initiatives and programs, including exhibitions, excavations, fellowships, professional exchanges, conservation projects, and traveling works of art.</p>
						</div>
					</div>
					<div id="categories-info">
						<div class="category-column">
							<div id="about-trav-ex">
								<p class="category-heading-trav-ex">Traveling <br />Exhibitions</p>
		
								<div class="extra-content"><p>The Met organizes large and small exhibitions that travel beyond the Museum's walls, extending our scholarship to institutions across the world. See our international exhibition program from 2009 to the present.</p></div>
							</div>
						</div>
						<div class="category-column">
							<div id="about-trav-works">
								<p class="category-heading-trav-works">Traveling<br /> Works of Art</p>
								<div class="extra-content"><p>The Met lends works of art to exhibitions and institutions worldwide to expose its collection to the broadest possible audience. See our current international loans program.</p></div>
		
							</div>
						</div>
						<div class="category-column">
							<div id="about-conservation">
								<p class="category-heading-conservation">Conservation</p>
								<div class="extra-content"><p>The preservation of works of art is a fundamental part of the Met's mission. Our work in this area includes treating works of art from other international collections, and advising on conservation projects and practices globally. See our international conservation program from 2009 to the present.</p></div>
							</div>
						</div>
		
						<div class="category-column">
							<div id="about-excavations">
								<p class="category-heading-excavations">Excavations</p>
								<div class="extra-content"><p>The Met has conducted excavations for over 100 years in direct partnership with source countries at some of the most important archaeological sites in the world. Today we continue this tradition in order to gain greater understanding of our ancient collections. See our international excavation program from the Met's founding to the present.</p> </div>
							</div>
						</div>
						<div class="category-column">
		
							<div id="about-fellowships">
								<p class="category-heading-fellowships">Fellowships</p>
								<div class="extra-content"><p>The Met hosts international students, scholars, and museum professionals so that they can learn from our staff and pursue independent research in the context of the Met's exceptional resources and facilities. See our current international fellowship program.</p></div>
							</div>
						</div>
						<div class="category-column">
							<div id="about-other-collab">
								<p class="category-heading-other-collab">Exchanges &amp; Collaborations</p>
		
								<div class="extra-content"><p>The Met's international work takes many forms, from participation in exchange programs at partnering institutions and worldwide symposia to advising on a range of museum issues. These activities contribute to our commitment to advancing the work of the larger, global community of art museums. See our international exchange program and other collaborations from 2009 to the present.</p></div>
							</div>
						</div>	
				</div>
				<div class="clear"></div>
			</div>
	
	</div>
	<div id="popupListHolder">
		<div id="popupList">
		</div>	
	</div>

	<div id="noContentRegion">There are currently no international activities in this region.</div>
	<div class="bottomContent">

		<div id="fullTextArea">
			<div class="popUp"></div>
			
