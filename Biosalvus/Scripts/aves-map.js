/**
* This is a simple JavaScript to call MapBox API to load Aves Endangered Points.
* Filter Function 1: based on Status; Endangered, Vulnerable etc. 
* Filter Function 2: after Filter 1 drill-down to aves belonging to that group. - Optional
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
* 
*
* Filter by Text Input 
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 21/04/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
var aves = [];
var cats = [];
// The first step is obtain all the latitude and longitude from the HTML
// jQuery selector for Aves Endangered
$(".avescoordinates").each(function () {
    var avesname = $(".avesname", this).text().trim();
    var aveslongitude = $(".aveslongitude", this).text().trim();
    var aveslatitude = $(".aveslatitude", this).text().trim();
    var avesstatus = $(".avesstatus", this).text().trim();
    var avesstate = $(".avesstate", this).text().trim();
    var catfood = $(".catfood", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "avesname": avesname,
        "aveslatitude": aveslatitude,
        "aveslongitude": aveslongitude,
        "avesstatus": avesstatus,
        "avesstate": avesstate,
        "catfood": catfood
    };
    // Push them all into an array.
    aves.push(point);
});
//data from points
var avesdata = [];
for (i = 0; i < aves.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "avesname": aves[i].avesname,
            "avesstatus": aves[i].avesstatus,
            "avesstate": aves[i].avesstate,
            "catfood": aves[i].catfood
            //"icon": "circle-15" //Point Type and Colour variations
        },
        "geometry": {
            "type": "Point",
            "coordinates": [aves[i].aveslongitude, aves[i].aveslatitude]
        }
    };
    avesdata.push(feature)
}

//finaldata
var avesfinaldata = {
    "type": "FeatureCollection",
    "features": avesdata
}


// jQuery selector for cats
$(".catcoordinates").each(function () {
    var catname = $(".catname", this).text().trim();
    var catlongitude = $(".catlongitude", this).text().trim();
    var catlatitude = $(".catlatitude", this).text().trim();
    var catstate = $(".catstate", this).text().trim();
    var catindividualcount = $(".catindividualcount", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "catname": catname,
        "catlatitude": catlatitude,
        "catlongitude": catlongitude,
        "catstate": catstate,
        "catindividualcount": catindividualcount
    };
    // Push them all into an array.
    cats.push(point);
});
//data from points
var catsdata = [];
for (i = 0; i < cats.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "catname": cats[i].catname,
            "catstate": cats[i].catstate,
            "catindividualcount": cats[i].catindividualcount,
            //"icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [cats[i].catlongitude, cats[i].catlatitude]
        }
    };
    catsdata.push(feature)
}

//finaldata
var catsfinaldata = {
    "type": "FeatureCollection",
    "features": catsdata
}




mapboxgl.accessToken = TOKEN;
var filterGroup = document.getElementById('filter-group'); //filter element
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', //light map
    zoom: 4,
    center: [144.946457, -37.840935] //Victoria, AUS
});
map.on('load', function () {
    // Add a GeoJSON source containing place coordinates and information for Aves.
    map.addSource('avesdatasource', {
        'type': 'geojson',
        'data': avesfinaldata
    });

    // Add a GeoJSON source containing place coordinates and information for Cats.
    map.addSource('catsdatasource', {
        'type': 'geojson',
        'data': catsfinaldata
    });

    //HEATMAP OF CATS
    map.addLayer(
        {
            'id': 'catdensity-heat',
            'type': 'heatmap',
            'source': 'catsdatasource',
            'maxzoom': 20,
            'paint': {
                // Increase the heatmap weight based on frequency and property individualcount
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'catindividualcount'],
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
                    0.1,
                    'rgba(103,169,207,1)',
                    0.2,
                    'rgba(209,229,240,1)',
                    0.3,
                    'rgba(153,255,148,1)',
                    0.4,
                    'rgba(87,255,82,1)',
                    0.5,
                    'rgba(255,255,183,1)',
                    0.6,
                    'rgba(255,255,177,1)',
                    0.7,
                    'rgba(250,252,84,1)',
                    0.8,
                    'rgba(253,219,199,1)',
                    0.9,
                    'rgba(239,138,98,1)',
                    1,
                    'rgba(178,24,43,1)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    1,
                    20,
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
            'source': 'catsdatasource',
            'minzoom': 15,
            'paint': {
                // Size circle radius by individualcount and zoom level
                'circle-radius': {
                    'base': 3,
                    'stops': [[12, 2], [22, 180]]
                },
                // Color circle by individualcount
                'circle-color': 'rgba(178,24,43,1)', //Max Zoom Colour
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    0,
                    18,
                    1
                ]
            }
        },
    );


    // ADD LAYER SHOWING AVES WITH FILTER FUNCTION
    avesfinaldata.features.forEach(function (feature) {
        var avesstatus = feature.properties['avesstatus'];
        var layerID = 'poi-' + avesstatus;

        // Add a layer for this avesstatus type if it hasn't been added already.
        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'circle',
                'source': 'avesdatasource',
                'paint': {
                    'circle-radius': {
                        'base': 4,
                        'stops': [[12, 2], [22, 180]]
                    },
                    'circle-color': [
                        'match',
                        ['get', 'avesstatus'],
                        'Extinct',
                        '#380b0b', //Dark Maroon
                        'Critically Endangered',
                        '#754d24', //Brown
                        'Vulnerable',
                        '#8b9133', //Light Moss Green
                        'Endangered',
                        '#e6e345', //Mustard
                        /*other*/'rgba(55,148,179,1)',
                    ]
                },
                'layout': {
                    'visibility': 'none',
                },
                'filter': ['==', 'avesstatus', avesstatus]
            });
            // Add checkbox and label elements for the layer.
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = false; //set to untick on initial load
            filterGroup.appendChild(input);

            var label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = avesstatus; //Label names
            filterGroup.appendChild(label);

            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', function (e) {
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