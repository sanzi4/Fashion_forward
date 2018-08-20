L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnN0ZXJuIiwiYSI6IlAzRFFiN0EifQ.mNWvayrLEw9wULuq0sopyA';
var map = L.mapbox.map('map', 'mapbox.streets');
var myLayer = L.mapbox.featureLayer().addTo(map);
var markerList = document.getElementById('marker-list');

var geoJson = [{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-73.95446400000003, 40.785656]},
    "properties": {
        'title': 'Hunter College High School',
        'marker-color': '#9932CC',
        'marker-symbol': 'college',
        'marker-size': 'large',

        // Store the image url and caption in an array.
        'images': [
          ['http://static.panoramio.com/photos/large/40847677.jpg','The school as viewed from a good angle on a nice day.'],
          ['http://www.hchs.hunter.cuny.edu/wiki/images/thumb/9/9a/Hunter_logo.png/529px-Hunter_logo.png','The school logo and motto!'],
          ['http://www.birdsasart.com/rootjpegs/Harris%27s-Hawk-flared-landing-_J7X0773-Las-Colmenas-Ranch,-Edinburg,-TX.jpg','The hawk, the school mascot!']
        ]
    }
}, {
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-74.01207629999999,40.7133882]},
    "properties": {
        'title': '7 World Trade Center',
        'marker-color': '#2F4F4F',
        'marker-symbol': 'star',
        'marker-size': 'large',
        'images': [
          ['http://girlswhocode.com/wp-content/uploads/2014/06/gwclogo1.png',"Girls Who Code! - Moody's, NYC"],
          ['http://nyc-architecture.com/120815/AAGAAR07-03.jpg','Oooh, shiny'],
          ['https://segd.org/sites/default/files/styles/galleryformatter_slide/public/04-world-trade-center-merit-2007-awards.jpg?itok=FQLvji8i','The main lobby at night seems so surreal...']
        ]
    }
},{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-73.99754200000001,40.715089]},
    "properties": {
        'title': 'Vivi Bubble Tea',
        'marker-color': '#006400',
        'marker-symbol': 'cafe',
        'marker-size': 'large',
        'images': [
          ['https://irs1.4sqi.net/img/general/600x600/Dhs8d3UGCm9GYMUXmbC7EmXEgbRuzFfJkCmDgNHSJ1g.jpg','Their bubble tea is delicious...'],
          ['https://irs0.4sqi.net/img/general/600x600/8104776_jIFA5xNwghyrrNj6V9wdZOtTxanFSiPzLm2pcrS5xVg.jpg','A street view of the shop.']
        ]
    }
},{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-73.99813499999999,40.716771]},
    "properties": {
        'title': 'Taipan Bakery',
        'marker-color': '#FF8C00',
        'marker-symbol': 'cafe',
        'marker-size': 'large',
        'images': [
          ['https://doctorofphabric.files.wordpress.com/2012/08/l.jpg','One of my favorite snacks here: the red-bean sesame rice ball.'],
          ['http://thehappinessinhealth.com/wp-content/uploads/2010/05/tat.jpg','Egg custard tarts can be found everywhere, not just here.'],
          ['http://www.seriouseats.com/assets_c/2014/05/20140508-chinese-bakeries-taipan-exterior-thumb-610x408-400832.jpg','A street view of the bakery.']
        ]
    }
},{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-73.97911399999998,40.763123]},
    "properties": {
        'title': 'Alliance Burnstein',
        'marker-color': '#008B8B',
        'marker-symbol': 'city',
        'marker-size': 'large',
        'images': [
          ['http://l3.yimg.com/bt/api/res/1.2/bSdMq53QjKhaqZ7GTy.loQ--/YXBwaWQ9eW5ld3M7cT04NQ--/https://photos.prnewswire.com/prnvar/20150119/169935LOGO','The much-hated-on new logo.'],
          ['http://i.ytimg.com/vi/4A56LOl3fKI/maxresdefault.jpg','Our robotics team...testing in progress!']
        ]
    }
},{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-73.98225339999999,40.75318230000001]},
    "properties": {
        'title': 'Stephen A. Schwarzman Building',
        'marker-color': '#A52A2A',
        'marker-symbol': 'library',
        'marker-size': 'large',
        'images': [
          ['http://artfcity.com/wp-content/uploads/2013/12/library.jpg',"I've been here more times than I'd have liked..."],
          ['http://cdn-prod.www.aws.nypl.org/sites/default/files/images/locations/36/interior_sasb_reading_room.jpg',"It's very impressive on the inside, though."]
        ]
    }
}];

// Add custom popup html to each marker.
myLayer.on('layeradd', function(e) {
    var marker = e.layer;
    var feature = marker.feature;
    var images = feature.properties.images
    var slideshowContent = '';

    for(var i = 0; i < images.length; i++) {
        var img = images[i];

        slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                              '<img src="' + img[0] + '" />' +
                              '<div class="caption">' + img[1] + '</div>' +
                            '</div>';
    }

    // Create custom popup content
    var popupContent =  '<div id="' + feature.properties.id + '" class="popup">' +
                            '<h2>' + feature.properties.title + '</h2>' +
                            '<div class="slideshow">' +
                                slideshowContent +
                            '</div>' +
                            '<div class="cycle">' +
                                '<a href="#" class="prev">&laquo; Previous</a>' +
                                '<a href="#" class="next">Next &raquo;</a>' +
                            '</div>'
                        '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 320
    });
});

$('#map').on('click', '.popup .cycle a', function() {
    var $slideshow = $('.slideshow'),
        $newSlide;

    if ($(this).hasClass('prev')) {
        $newSlide = $slideshow.find('.active').prev();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').last();
        }
    } else {
        $newSlide = $slideshow.find('.active').next();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').first();
        }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
    return false;
});


for (var i=0; i<geoJson.length; i++){
	var item = markerList.appendChild(document.createElement('li'));
    item.innerHTML = geoJson[i].properties.title;
}

// Add features to the map
myLayer.setGeoJSON(geoJson);

map.setView([40.75,-73.99], 13);
