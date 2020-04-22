/**
* This is a JavaScript to call MapBox API to load the maps of Species Australia db.
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* 
* Filter by Tickbox  
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 22/04/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
var species = [];
// The first step is obtain all the latitude and longitude from the HTML
// The below is a simple jQuery selector
$(".species").each(function () {
    var speciesname = $(".speciesname", this).text().trim();
    var statecode = $(".statecode", this).text().trim();
    var statename = $(".statename", this).text().trim();
    var speciesstatus = $(".speciesstatus", this).text().trim();
    var present = $(".present", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "speciesname": speciesname,
        "statecode": statecode,
        "statename": statename,
        "speciesstatus": speciesstatus,
        "present": present
    };
    // Push them all into an array.
    species.push(point);
});

//finaldata
var finaldata = {
    "type": "FeatureCollection",
    "features": data
}

mapboxgl.accessToken = TOKEN;
//var filterGroup = document.getElementById('filter-group'); //filter element
var map = new mapboxgl.Map({
    container: 'species-map',
    style: 'mapbox://styles/mapbox/light-v10', //light map
    zoom: 4,
    center: [131.0369, -25.3444] //Uluru Longitude (Center of Australia)
});
map.on('load', function () {
    //STATES ADD GEOJSON SECTION
    // Add a source for NEW SOUTH WALES state polygons.
    map.addSource('nsw', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/nsw-state-boundary/wfs?request=GetFeature&typeName=ckan_a1b278b1_59ef_4dea_8468_50eb09967f18&outputFormat=json'
    });

    // Add a source for AUSTRALIAN CAPITAL TERRITORY state polygons.
    map.addSource('act', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/act-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_83468f0c_313d_4354_9592_289554eb2dc9&outputFormat=json'
    });

    // Add a source for SOUTH AUSTRALIA state polygons.
    map.addSource('sa', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/sa-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_8f996b8c_d939_4757_a231_3fec8cb8e929&outputFormat=json'
    });

    // Add a source for VICTORIA state polygons.
    map.addSource('vic', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/vic-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_b90c2a19_d978_4e14_bb15_1114b46464fb&outputFormat=json'
    });

    // Add a source for TASMANIA state polygons.
    map.addSource('tas', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/tas-state-boundary/wfs?request=GetFeature&typeName=ckan_cf2ebc53_1633_4c5c_b892_bfc3945d913b&outputFormat=json'
    });

    // Add a source for QUEENSLAND state polygons.
    map.addSource('qld', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/qld-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_2dbbec1a_99a2_4ee5_8806_53bc41d038a7&outputFormat=json'
    });

    // Add a source for WESTERN AUSTRALIA state polygons.
    map.addSource('wa', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/wa-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_5c00d495_21ba_452d_ae46_1ad0ca05e41f&outputFormat=json'
    });

    // Add a source for NORTHEN TERRITORY state polygons.
    map.addSource('nt', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/nt-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_5162e11c_3259_4894_8b9e_f44540b6cb11&outputFormat=json'
    });

    //STATES ADD LAYER SECTION
    // Add a layer showing NEW SOUTH WALES state polygons.
    map.addLayer({
        'id': 'nsw-layer',
        'type': 'fill',
        'source': 'nsw',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing AUSTRALIAN CAPITAL TERRITORY state polygons.
    map.addLayer({
        'id': 'act-layer',
        'type': 'fill',
        'source': 'act',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing SOUTH AUSTRALIA state polygons.
    map.addLayer({
        'id': 'sa-layer',
        'type': 'fill',
        'source': 'sa',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing VICTORIA state polygons.
    map.addLayer({
        'id': 'vic-layer',
        'type': 'fill',
        'source': 'vic',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing TASMANIA state polygons.
    map.addLayer({
        'id': 'tas-layer',
        'type': 'fill',
        'source': 'tas',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing QUEENSLAND state polygons.
    map.addLayer({
        'id': 'qld-layer',
        'type': 'fill',
        'source': 'qld',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing WESTERN AUSTRALIA state polygons.
    map.addLayer({
        'id': 'wa-layer',
        'type': 'fill',
        'source': 'wa',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });

    // Add a layer showing NORTHEN TERRITORY state polygons.
    map.addLayer({
        'id': 'nt-layer',
        'type': 'fill',
        'source': 'nt',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });

    //STATES ON CLICK FUNCTIONS
    // When a click event occurs on a feature in the NEW SOUTH WALES layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'nsw-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the AUSTRALIAN CAPITAL TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'act-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the SOUTH AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'sa-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the VICTORIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'vic-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the TASMANIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'tas-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the QUEENSLAND layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'qld-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the WESTERN AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'wa-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the NORTHEN TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'nt-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });



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

