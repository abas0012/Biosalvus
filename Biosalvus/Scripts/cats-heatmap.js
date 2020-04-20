/**
* This is a JavaScript to call MapBox API to load the maps with heatmap layers
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* 
* HeatMaps
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 20/04/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
var cats = [];
// The first step is obtain all the latitude and longitude from the HTML
// The below is a simple jQuery selector
$(".coordinates").each(function () {
    var name = $(".name", this).text().trim();
    var longitude = $(".longitude", this).text().trim();
    var latitude = $(".latitude", this).text().trim();
    var state = $(".state", this).text().trim(); individualcount
    var individualcount = $(".individualcount", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "name": name,
        "latitude": latitude,
        "longitude": longitude,
        "state": state,
        "individualcount": individualcount
    };
    // Push them all into an array.
    cats.push(point);
});
//data from points
var data = [];
for (i = 0; i < cats.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "name": cats[i].name,
            "state": cats[i].state,
            "individualcount": cats[i].individualcount,
            "icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [cats[i].longitude, cats[i].latitude]
        }
    };
    data.push(feature)
}

//finaldata
var finaldata = {
    "type": "FeatureCollection",
    "features": data
}

mapboxgl.accessToken = TOKEN;
var filterGroup = document.getElementById('filter-group'); //filter element
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', //light map
    zoom: 4,
    center: [131.0369, -25.3444] //Uluru Longitude (Center of Australia)
});

map.on('load', function () {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('datasource', {
        'type': 'geojson',
        'data': finaldata
    });

    map.addLayer(
        {
            'id': 'catdensity-heat',
            'type': 'heatmap',
            'source': 'datasource',
            'maxzoom': 9,
            'paint': {
                // Increase the heatmap weight based on frequency and property individualcount
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'individualcount'],
                    0,
                    0,
                    6,
                    1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    2,
                    9,
                    20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0
                ]
            }
        },
        'waterway-label'
    );

    map.addLayer(
        {
            'id': 'catdensity-point',
            'type': 'circle',
            'source': 'datasource',
            'minzoom': 7,
            'paint': {
                // Size circle radius by individualcount and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    ['interpolate', ['linear'], ['get', 'individualcount'], 1, 1, 6, 4],
                    16,
                    ['interpolate', ['linear'], ['get', 'individualcount'], 1, 5, 6, 50]
                ],
                // Color circle by individualcount
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'individualcount'],
                    1,
                    'rgb(103,169,207)',
                    2,
                    'rgb(209,229,240)',
                    3,
                    'rgb(253,219,199)',
                    4,
                    'rgb(239,138,98)',
                    5,
                    'rgb(178,24,43)',
                    6,
                    'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    0,
                    8,
                    1
                ]
            }
        },
    );

});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));;
map.addControl(new mapboxgl.NavigationControl());
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'places', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
});

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

