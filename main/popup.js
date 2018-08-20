
// coordinates switched
var position= [-73.9835, 40.754];

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857'),
        zoom: 15
    })
});

function createStyle(src, img) {
  return new ol.style({
    image: new ol.style.Icon
   // /** @type {module:ol/style/Icon~Options} */
      (({anchor: [0.5, 0.96],
      crossOrigin: 'anonymous',
      src: src,
      img: img,
      imgSize: img ? [img.width, img.height] : undefined
    }))
  });
}

var marker= new ol.Feature(new ol.geom.Point([-73.9949053,40.722571]));
marker.set('style', createStyle('icon.png', undefined));

map.addLayer(marker);

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(-73.9949053,40.722571),icon));
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(-73.992199571429,40.725036571429),icon.clone()));


var popup = new Popup();
map.addOverlay(popup);

map.on('singleclick', function(evt) {
  //stating the coordinate
    // var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    popup.show(evt.coordinate, '<div><h2>Store</h2><p>' + '<h3>Everlane</h3>' + '</p></div>');
});
