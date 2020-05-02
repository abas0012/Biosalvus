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
var vulnerablearray = [];
var endangeredarray = [];
var critendangeredarray = [];
var vulnerable = false;
var endangered = false;
var critendangered = false;
//// The first step is obtain all the latitude and longitude from the HTML
//// jQuery selector for Aves Endangered
//$(".avescoordinates").each(function () {
//    var avesname = $(".avesname", this).text().trim();
//    var aveslongitude = $(".aveslongitude", this).text().trim();
//    var aveslatitude = $(".aveslatitude", this).text().trim();
//    var avesstatus = $(".avesstatus", this).text().trim();
//    var avesstate = $(".avesstate", this).text().trim();
//    var catfood = $(".catfood", this).text().trim();
//    // Create a point data structure to hold the values.
//    var point = {
//        "avesname": avesname,
//        "aveslatitude": aveslatitude,
//        "aveslongitude": aveslongitude,
//        "avesstatus": avesstatus,
//        "avesstate": avesstate,
//        "catfood": catfood
//    };
//    // Push them all into an array.
//    aves.push(point);
//});
////data from points
//var avesdata = [];
//for (i = 0; i < aves.length; i++) {
//    var feature = {
//        "type": "Feature",
//        "properties": {
//            "avesname": aves[i].avesname,
//            "avesstatus": aves[i].avesstatus,
//            "avesstate": aves[i].avesstate,
//            "catfood": aves[i].catfood
//            //"icon": "circle-15" //Point Type and Colour variations
//        },
//        "geometry": {
//            "type": "Point",
//            "coordinates": [aves[i].aveslongitude, aves[i].aveslatitude]
//        }
//    };
//    avesdata.push(feature)
//}
////finaldata
//var avesfinaldata = {
//    "type": "FeatureCollection",
//    "features": avesdata
//}
//GATHER BIRDS LOCATION DATA

//Vulnerable Birds
$(".vulnerablebirds").each(function () {
    var vulnerablename = $(".vulnerablename", this).text().trim();
    var vulnerablescientific = $(".vulnerablescientific", this).text().trim();
    var vulnerablelongitude = $(".vulnerablelongitude", this).text().trim();
    var vulnerablelatitude = $(".vulnerablelatitude", this).text().trim();
    var vulnerablestate = $(".vulnerablestate", this).text().trim();
    var vulnerablestatus = $(".vulnerablestatus", this).text().trim();
    var vulnerablecatfood = $(".vulnerablecatfood", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "vulnerablename": vulnerablename,
        "vulnerablescientific": vulnerablescientific,
        "vulnerablelongitude": vulnerablelongitude,
        "vulnerablelatitude": vulnerablelatitude,
        "vulnerablestate": vulnerablestate,
        "vulnerablestatus": vulnerablestatus,
        "vulnerablecatfood": vulnerablecatfood
    };
    // Push them all into an array.
    vulnerablearray.push(point);
});
//data from points
var vulnerabledata = [];
for (i = 0; i < vulnerablearray.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "vulnerablename": vulnerablearray[i].vulnerablename,
            "vulnerablescientific": vulnerablearray[i].vulnerablescientific,
            "vulnerablestate": vulnerablearray[i].vulnerablestate,
            "vulnerablestatus": vulnerablearray[i].vulnerablestatus,
            "vulnerablecatfood": vulnerablearray[i].vulnerablecatfood,
            "icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [vulnerablearray[i].vulnerablelongitude, vulnerablearray[i].vulnerablelatitude]
        }
    };
    vulnerabledata.push(feature)
}
//finaldata
var vulnerablefinaldata = {
    "type": "FeatureCollection",
    "features": vulnerabledata
}


//Critically Endangered Birds
$(".critendangeredbirds").each(function () {
    var critendangeredname = $(".critendangeredname", this).text().trim();
    var critendangeredscientific = $(".critendangeredscientific", this).text().trim();
    var critendangeredlongitude = $(".critendangeredlongitude", this).text().trim();
    var critendangeredlatitude = $(".critendangeredlatitude", this).text().trim();
    var critendangeredstate = $(".critendangeredstate", this).text().trim();
    var critendangeredstatus = $(".critendangeredstatus", this).text().trim();
    var critendangeredcatfood = $(".critendangeredcatfood", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "critendangeredname": critendangeredname,
        "critendangeredscientific": critendangeredscientific,
        "critendangeredlongitude": critendangeredlongitude,
        "critendangeredlatitude": critendangeredlatitude,
        "critendangeredstate": critendangeredstate,
        "critendangeredstatus": critendangeredstatus,
        "critendangeredcatfood": critendangeredcatfood
    };
    // Push them all into an array.
    critendangeredarray.push(point);
});
//data from points
var critendangereddata = [];
for (i = 0; i < critendangeredarray.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "critendangeredname": critendangeredarray[i].critendangeredname,
            "critendangeredscientific": critendangeredarray[i].critendangeredscientific,
            "critendangeredstate": critendangeredarray[i].critendangeredstate,
            "critendangeredstatus": critendangeredarray[i].critendangeredstatus,
            "critendangeredcatfood": critendangeredarray[i].critendangeredcatfood,
            "icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [critendangeredarray[i].critendangeredlongitude, critendangeredarray[i].critendangeredlatitude]
        }
    };
    critendangereddata.push(feature)
}
//finaldata
var critendangeredfinaldata = {
    "type": "FeatureCollection",
    "features": critendangereddata
}

//Endangered Birds
$(".endangeredbirds").each(function () {
    var endangeredname = $(".endangeredname", this).text().trim();
    var endangeredscientific = $(".endangeredscientific", this).text().trim();
    var endangeredlongitude = $(".endangeredlongitude", this).text().trim();
    var endangeredlatitude = $(".endangeredlatitude", this).text().trim();
    var endangeredstate = $(".endangeredstate", this).text().trim();
    var endangeredstatus = $(".endangeredstatus", this).text().trim();
    var endangeredcatfood = $(".endangeredcatfood", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "endangeredname": endangeredname,
        "endangeredscientific": endangeredscientific,
        "endangeredlongitude": endangeredlongitude,
        "endangeredlatitude": endangeredlatitude,
        "endangeredstate": endangeredstate,
        "endangeredstatus": endangeredstatus,
        "endangeredcatfood": endangeredcatfood
    };
    // Push them all into an array.
    endangeredarray.push(point);
});
//data from points
var endangereddata = [];
for (i = 0; i < endangeredarray.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            "endangeredname": endangeredarray[i].endangeredname,
            "endangeredscientific": endangeredarray[i].endangeredscientific,
            "endangeredstate": endangeredarray[i].endangeredstate,
            "endangeredstatus": endangeredarray[i].endangeredstatus,
            "endangeredcatfood": endangeredarray[i].endangeredcatfood,
            "icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [endangeredarray[i].endangeredlongitude, endangeredarray[i].endangeredlatitude]
        }
    };
    endangereddata.push(feature)
}
//finaldata
var endangeredfinaldata = {
    "type": "FeatureCollection",
    "features": endangereddata
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
    zoom: 6,
    maxzoom: 10,
    center: [endangeredarray[i].endangeredlongitude, endangeredarray[i].endangeredlatitude]
    //center: [144.946457, -37.840935] //Victoria, AUS
});
map.on('load', function () {
    console.log(endangeredfinaldata);
    console.log(critendangeredfinaldata);
    console.log(vulnerablefinaldata);
    //// Add a GeoJSON source containing place coordinates and information for Aves.
    //map.addSource('avesdatasource', {
    //    'type': 'geojson',
    //    'data': avesfinaldata
    //});

    // Add a GeoJSON source containing place coordinates and information for Endangered Birds.
    map.addSource('endangereddatasource', {
        'type': 'geojson',
        'data': endangeredfinaldata
    });
    // Add a GeoJSON source containing place coordinates and information for Critically Endangered Birds.
    map.addSource('critendangereddatasource', {
        'type': 'geojson',
        'data': critendangeredfinaldata
    });
    // Add a GeoJSON source containing place coordinates and information for Vulnerable Birds.
    map.addSource('vulnerabledatasource', {
        'type': 'geojson',
        'data': vulnerablefinaldata
    });
    
    //Endangered Birds Layer
    map.addLayer(
        {
            'id': 'endangeredbirds',
            'type': 'circle',
            'source': 'endangereddatasource',
            'paint': {
                'circle-color': 'rgba(255,0,0,1)', //RED
                'circle-radius': 3
            },
            'layout': {
                'visibility': 'none'
            }
        }
    );
    //Critically Endangered Birds Layer
    map.addLayer(
        {
            'id': 'critendangeredbirds',
            'type': 'circle',
            'source': 'critendangereddatasource',
            'paint': {
                'circle-color': 'rgba(255,0,0,1)', //RED
                'circle-radius': 3
            },
            'layout': {
                'visibility': 'none'
            }
        }
    );
    //Vulnerable Birds Layer
    map.addLayer(
        {
            'id': 'vulnerablebirds',
            'type': 'circle',
            'source': 'vulnerabledatasource',
            'paint': {
                'circle-color': 'rgba(255,0,0,1)', //RED
                'circle-radius': 3
            },
            'layout': {
                'visibility': 'none'
            }
        }
    );

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
                    'rgba(103,169,207,0.5)',
                    0.2,
                    'rgba(209,229,240,0.5)',
                    0.3,
                    'rgba(153,255,148,0.5)',
                    0.4,
                    'rgba(87,255,82,0.5)',
                    0.5,
                    'rgba(255,255,183,0.5)',
                    0.6,
                    'rgba(255,255,177,0.5)',
                    0.7,
                    'rgba(250,252,84,0.5)',
                    0.8,
                    'rgba(253,219,199,0.5)',
                    0.9,
                    'rgba(239,138,98,0.5)',
                    1,
                    'rgba(255,200,0,0.5)'
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

    //map.addLayer(
    //    {
    //        'id': 'catdensity-point',
    //        'type': 'circle',
    //        'source': 'catsdatasource',
    //        'minzoom': 15,
    //        'paint': {
    //            // Size circle radius by individualcount and zoom level
    //            'circle-radius': {
    //                'base': 3,
    //                'stops': [[12, 2], [22, 180]]
    //            },
    //            // Color circle by individualcount
    //            'circle-color': 'rgba(178,24,43,1)', //Max Zoom Colour
    //            'circle-stroke-color': 'white',
    //            'circle-stroke-width': 1,
    //            // Transition from heatmap to circle layer by zoom level
    //            'circle-opacity': [
    //                'interpolate',
    //                ['linear'],
    //                ['zoom'],
    //                10,
    //                0,
    //                18,
    //                1
    //            ]
    //        }
    //    },
    //);


    //// ADD LAYER SHOWING AVES WITH FILTER FUNCTION
    //avesfinaldata.features.forEach(function (feature) {
    //    var avesstatus = feature.properties['avesstatus'];
    //    var layerID = 'poi-' + avesstatus;

    //    // Add a layer for this avesstatus type if it hasn't been added already.
    //    if (!map.getLayer(layerID)) {
    //        map.addLayer({
    //            'id': layerID,
    //            'type': 'circle',
    //            'source': 'avesdatasource',
    //            'paint': {
    //                  'circle-color': 'rgba(255,0,0,1)', //RED
    //                  'circle-radius': 4,
    //            'layout': {
    //                'visibility': 'none',
    //            },
    //            'filter': ['==', 'avesstatus', avesstatus]
    //        });
    //        // Add checkbox and label elements for the layer.
    //        var input = document.createElement('input');
    //        input.type = 'checkbox';
    //        input.id = layerID;
    //        input.checked = false; //set to untick on initial load
    //        filterGroup.appendChild(input);

    //        var label = document.createElement('label');
    //        label.setAttribute('for', layerID);
    //        label.textContent = avesstatus; //Label names
    //        filterGroup.appendChild(label);

    //        //ON CLICK VISIBLE/HIDE
    //        // When the checkbox changes, update the visibility of the layer.
    //        input.addEventListener('change', function (e) {
    //            map.setLayoutProperty(
    //                layerID,
    //                'visibility',
    //                e.target.checked ? 'visible' : 'none'
    //            );
    //        });
    //    }
    //});

    //BUTTONS INTERACTIONS
    document.getElementById("vulnerablebtn").addEventListener("click", function () {
        hideBirds();
        setAllStatusFlagOFF();
        vulnerable = true;
        //showBirds();
        map.setLayoutProperty(
            'vulnerablebirds',
            'visibility',
            'visible'
        );
    });
    document.getElementById("endangeredbtn").addEventListener("click", function () {
        hideBirds();
        setAllStatusFlagOFF();
        endangered = true;
        //showBirds();
        map.setLayoutProperty(
            'endangeredbirds',
            'visibility',
            'visible'
        );
    });
    document.getElementById("critendangeredbtn").addEventListener("click", function () {
        const startTime = performance.now(); //performance testing
        hideBirds();
        setAllStatusFlagOFF();
        critendangered = true;
        //showBirds();
        map.setLayoutProperty(
            'critendangeredbirds',
            'visibility',
            'visible'
        );
        const duration = performance.now() - startTime; //performance testing
        console.log(duration); //performance testing
    });
});

//Show Bird coordinates if Status is true.
function showBirds() {
    const startTime = performance.now(); //performance testing
    if (vulnerable = true) {
        map.setLayoutProperty(
            'vulnerablebirds',
            'visibility',
            'visible'
        );
    }
    else if (endangered = true) {
        map.setLayoutProperty(
            'endangeredbirds',
            'visibility',
            'visible'
        );
    }
    else if (critendangered = true) {
        map.setLayoutProperty(
            'critendangeredbirds',
            'visibility',
            'visible'
        );
    }
    const duration = performance.now() - startTime; //performance testing
    console.log(duration); //performance testing
}
//Hide Bird coordinates
function hideBirds() {
    const startTime = performance.now(); //performance testing
    map.setLayoutProperty(
        'endangeredbirds',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'critendangeredbirds',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'vulnerablebirds',
        'visibility',
        'none'
    );
    const duration = performance.now() - startTime; //performance testing
    console.log(duration); //performance testing
}

//sets all status boolean flag to False
function setAllStatusFlagOFF() {
    const startTime = performance.now(); //performance testing
    vulnerable = false;
    endangered = false;
    critendangered = false;
    const duration = performance.now() - startTime; //performance testing
    console.log(duration); //performance testing
}

map.addControl(new mapboxgl.NavigationControl());
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'endangeredbirds', function (e) {
    var name = e.features[0].properties.endangeredname;
    new mapboxgl.Popup()
        .setHTML(name)
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the endangeredbirds layer.
map.on('mouseenter', 'endangeredbirds', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'endangeredbirds', function () {
    map.getCanvas().style.cursor = '';
});

