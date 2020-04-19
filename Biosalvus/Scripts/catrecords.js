/**
* This is a JavaScript to call MapBox API to load the maps.
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* 
* Filter by Tickbox  
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 19/04/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
var cats = [];
// The first step is obtain all the latitude and longitude from the HTML
// The below is a simple jQuery selector
$(".coordinates").each(function () {
    var name = $(".name", this).text().trim();
    var longitude = $(".longitude", this).text().trim();
    var latitude = $(".latitude", this).text().trim();
    var state = $(".state", this).text().trim();
    var lga = $(".lga", this).text().trim();
    //var year = $(".year", this).text().trim();
    //var month = $(".month", this).text().trim();
    //var day = $(".day", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "name": name,
        "latitude": latitude,
        "longitude": longitude,
        "state" : state,
        "lga": lga
        //"year": year,
        //"month": month,
        //"day": day
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
            "lga": cats[i].lga,
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
        'data': finaldata,
        'cluster': true,
        'clusterMaxZoom': 14, // Max zoom to cluster points on
        'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)
    });


    // Add a layer showing the cats.
    finaldata.features.forEach(function (feature) {
        var symbol = feature.properties['icon'];
        var lga = feature.properties['lga'];
        var state = feature.properties['state'];
        var layerID = 'poi-' + state;
        var clustercountID = 'clu-' + state;

        // Add a layer for this symbol type if it hasn't been added already.
        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'circle',
                'source': 'datasource',
                'paint': {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6', //light blue
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                },
                'layout': {
                    'visibility': 'none'
                },
                'filter': //[
                    //"all",
                    //['has', 'point_count'],
                    ['==', 'state', state]
                //]
            });

            map.addLayer({
                'id': clustercountID,
                'type': 'symbol',
                'source': 'datasource',
                'layout': {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                'filter': //[
                //    'all',
                    ['has', 'point_count']//,
                    //['==', 'state', state]
                    //],
                
            });

            // Add checkbox and label elements for the layer.
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = false; //set to untick on initial load
            filterGroup.appendChild(input);

            var label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = state; //Label names
            filterGroup.appendChild(label);

            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', function (e) {
                map.setLayoutProperty(
                    clustercountID,
                    'visibility',
                    e.target.checked ? 'visible' : 'none'
                );
                map.setLayoutProperty(
                    layerID,
                    'visibility',
                    e.target.checked ? 'visible' : 'none'
                );
            });
        }
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

