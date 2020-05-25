/**
* This is a JavaScript file to call MapBox API to load Aves Endangered Points.
* Filter Function 1: based on Status; Endangered, Vulnerable etc. 
* Filter Function 2: after Filter 1 drill-down to Birds belonging to that group. - Optional
* 
* External API used:
* https://docs.mapbox.com/mapbox-gl-js/api/
* https://www.chartjs.org/
* See each respective API Links for more details
*
* 
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Create Date: 21/04/2020
* Last Update Date: 25/05/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
var aves = [];
var cats = [];
var fires = [];
//var vulnerablearray = [];
var endangeredarray = [];
var critendangeredarray = [];
//var vulnerable = false;
var endangered = false;
var critendangered = false;


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



//Fire Coordinates
$(".firecoordinates").each(function () {
    var firelatitude = $(".firelatitude", this).text().trim();
    var firelongitude = $(".firelongitude", this).text().trim();
    //var firecity = $(".firecity", this).text().trim();
    //var firedate = $(".firedate", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "firelatitude": firelatitude,
        "firelongitude": firelongitude
        //"firecity": firecity,
        //"firedate": firedate
    };
    // Push them all into an array.
    fires.push(point);
});
//data from points
var firedata = [];
for (i = 0; i < fires.length; i++) {
    var feature = {
        "type": "Feature",
        "properties": {
            //"firecity": fires[i].firecity,
            //"firedate": fires[i].firedate,
            "firecount": 1,
            "icon": "circle-15"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [fires[i].firelongitude, fires[i].firelatitude]
        }
    };
    firedata.push(feature)
}
//finaldata
var firefinaldata = {
    "type": "FeatureCollection",
    "features": firedata
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
    zoom: 5,
    maxZoom: 8,
    minZoom: 5,
    //center: [endangeredarray[i].endangeredlongitude, endangeredarray[i].endangeredlatitude]
    center: [144.946457, -37.840935] //Victoria, AUS
});
map.on('load', function () {
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
    map.addSource('currentendangered', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": []
        }
    });
    map.addLayer({
        "id": "endangeredhighlight",
        "source": "currentendangered",
        'type': 'circle',
        'paint': {
            'circle-color': 'rgba(255,0,0,1)', //RED
            'circle-radius': 5
        }
    });
    // Add a GeoJSON source containing place coordinates and information for Critically Endangered Birds.
    map.addSource('critendangereddatasource', {
        'type': 'geojson',
        'data': critendangeredfinaldata
    });
    map.addSource('currentcritendangered', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": []
        }
    });
    map.addLayer({
        "id": "critendangeredhighlight",
        "source": "currentcritendangered",
        'type': 'circle',
        'paint': {
            'circle-color': 'rgba(255,0,0,1)', //RED
            'circle-radius': 5
        }
    });
    // Add a GeoJSON source containing place coordinates and information for Fire.
    map.addSource('firedatasource', {
        'type': 'geojson',
        'data': firefinaldata
    });
    
    //Endangered Birds Layer
    map.addLayer(
        {
            'id': 'endangeredbirds',
            'type': 'circle',
            'source': 'endangereddatasource',
            'paint': {
                'circle-color': 'rgba(0,0,0,1)', //BLACK
                'circle-radius': 3.5
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
                'circle-color': 'rgba(0,0,0,1)', //BLACK
                'circle-radius': 3.5
            },
            'layout': {
                'visibility': 'none'
            }
        }
    );
    ////Vulnerable Birds Layer
    //map.addLayer(
    //    {
    //        'id': 'vulnerablebirds',
    //        'type': 'circle',
    //        'source': 'vulnerabledatasource',
    //        'paint': {
    //            'circle-color': 'rgba(0,0,0,1)', //BLACK
    //            'circle-radius': 3
    //        },
    //        'layout': {
    //            'visibility': 'none'
    //        }
    //    }
    //);
    ////Fire Layer
    //map.addLayer(
    //    {
    //        'id': 'firelayer',
    //        'type': 'circle',
    //        'source': 'firedatasource',
    //        'paint': {
    //            'circle-color': 'rgba(255,0,0,1)', //RED
    //            'circle-radius': 2
    //        }
    //    }
    //);
    //HEATMAP OF FIRE
    map.addLayer(
        {
            'id': 'firedensity-heat',
            'type': 'heatmap',
            'source': 'firedatasource',
            'maxzoom': 20,
            'paint': {
                // Increase the heatmap weight based on frequency and property individualcount
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'firecount'],
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
                    'rgba(255,255,0,0)',
                    0.1,
                    'rgba(255,225,0,0.5)',
                    0.2,
                    'rgba(255,200,0,0.5)',
                    0.3,
                    'rgba(255,175,0,0.5)',
                    0.4,
                    'rgba(255,150,0,0.5)',
                    0.5,
                    'rgba(255,125,0,0.5)',
                    0.6,
                    'rgba(255,100,0,0.5)',
                    0.7,
                    'rgba(255,75,0,0.5)',
                    0.8,
                    'rgba(255,50,0,0.5)',
                    0.9,
                    'rgba(255,25,0,0.5)',
                    1,
                    'rgba(255,0,0,0.5)'
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
                    'rgba(255,255,255,0)',
                    0.1,
                    'rgba(255,255,255,0.5)',
                    0.2,
                    'rgba(255,255,255,0.5)',
                    0.3,
                    'rgba(225,255,0,0.5)',
                    0.4,
                    'rgba(225,225,0,0.5)',
                    0.5,
                    'rgba(225,205,0,0.5)',
                    0.6,
                    'rgba(225,190,0,0.5)',
                    0.7,
                    'rgba(255,180,0,0.5)',
                    0.8,
                    'rgba(255,170,0,0.5)',
                    0.9,
                    'rgba(255,160,0,0.5)',
                    1,
                    'rgba(255,150,0,0.5)'
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

    //BUTTONS INTERACTIONS
    document.getElementById("endangeredbtn").addEventListener("click", function () {
        resetStatusBtnColor();
        document.getElementById("endangeredbtn").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
        hideBirds();
        setAllStatusFlagOFF();
        endangered = true;
        map.setLayoutProperty(
            'endangeredbirds',
            'visibility',
            'visible'
        );
        map.setLayoutProperty(
            'endangeredhighlight',
            'visibility',
            'visible'
        );
        showEndangeredList();
        //hideVulnerableList();
        hideCritEndangeredList();
    });
    document.getElementById("critendangeredbtn").addEventListener("click", function () {
        resetStatusBtnColor();
        document.getElementById("critendangeredbtn").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
        hideBirds();
        setAllStatusFlagOFF();
        map.setLayoutProperty(
            'critendangeredbirds',
            'visibility',
            'visible'
        );
        map.setLayoutProperty(
            'critendangeredhighlight',
            'visibility',
            'visible'
        );
        //hideVulnerableList();
        hideEndangeredList();
        showCritEndangeredList();
    });
});
//Function to Reset border colour in Status Button to #2c6e49 (Dark Green)
const statusbtnarray = ['endangeredbtn', 'critendangeredbtn'];
function resetStatusBtnColor() {
    for (i = 0; i < statusbtnarray.length; i++) {
        document.getElementById(statusbtnarray[i]).style.backgroundColor = '#2c6e49';
    }
}

//HIDE AND SHOW BIRDS LISTS
function showVulnerableList() {
    for (i = 0; i < vulnerablelist.length; i++) {
        if (document.getElementById(vulnerablelist[i]) != null) {
            document.getElementById(vulnerablelist[i]).style.display = "block";
        };      
    };
};
var endangeredlist = ['endangeredheader', 'australasianbitternlst', 'azurekingfisherlst', 'blackearedminerlst', 'brownthornbilllst'
    , 'easternbristlebirdlst', 'easterngroundparrotlst', 'glossyblackcockatoolst', 'helmetedhoneyeaterlst', 'hoodedrobinlst'
    , 'huahoulst', 'malleeemuwrenlst', 'redtailedblackcockatoolst', 'southernemuwrenlst', 'southerngiantpetrellst'
    , 'swiftparrotlst', 'wedgetailedeaglelst', 'yellowtuftedhoneyeaterlst'];
function hideEndangeredList() {
    for (i = 0; i < endangeredlist.length; i++) {
        if (document.getElementById(endangeredlist[i]) != null) {
            document.getElementById(endangeredlist[i]).style.display = "none";
        }
    };
};
function showEndangeredList() {
    for (i = 0; i < endangeredlist.length; i++) {
        if (document.getElementById(endangeredlist[i]) != null) {
            document.getElementById(endangeredlist[i]).style.display = "block";
        };        
    };
};
var critEndangeredlist = ['critendangeredheader', 'curlewsandpiperlst', 'easterncurlewlst', 'greatknotlst', 'orangebelliedparrotlst'
    , 'plainswandererlst', 'regenthoneyeaterlst', 'spottedquailthrushlst'];
function hideCritEndangeredList() {
    for (i = 0; i < critEndangeredlist.length; i++) {
        if (document.getElementById(critEndangeredlist[i]) != null) {
            document.getElementById(critEndangeredlist[i]).style.display = "none";
        };        
    };
};
function showCritEndangeredList() {
    for (i = 0; i < critEndangeredlist.length; i++) {
        if (document.getElementById(critEndangeredlist[i]) != null) {
            document.getElementById(critEndangeredlist[i]).style.display = "block";
        };
    };
};





//Show Bird coordinates if Status is true.
function showBirds() {
    //if (vulnerable = true) {
    //    map.setLayoutProperty(
    //        'vulnerablebirds',
    //        'visibility',
    //        'visible'
    //    );
    //}
    if (endangered = true) {
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
}
//Hide Bird coordinates
function hideBirds() {
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
        'endangeredhighlight',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'critendangeredhighlight',
        'visibility',
        'none'
    );
}

//sets all status boolean flag to False
function setAllStatusFlagOFF() {
    //vulnerable = false;
    endangered = false;
    critendangered = false;
}

map.addControl(new mapboxgl.NavigationControl());
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'endangeredbirds', function (e) {
    var name = e.features[0].properties.endangeredname;
    var coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    var highlight = []; //THIS WORKS
    for (i = 0; i < endangereddata.length; i++) {
        if (endangereddata[i].properties.endangeredname == name) {
            highlight.push(endangereddata[i]);
        }
    };
    new mapboxgl.Popup().setLngLat(coordinates).setHTML(name).addTo(map);
    map.getSource('currentendangered').setData({
        "type": "FeatureCollection",
        "features": highlight
    });
});
// Change the cursor to a pointer when the mouse is over the endangeredbirds layer.
map.on('mouseenter', 'endangeredbirds', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'endangeredbirds', function () {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'critendangeredbirds', function (e) {
    var name = e.features[0].properties.critendangeredname;
    var coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    var highlight = []; //THIS WORKS
    for (i = 0; i < critendangereddata.length; i++) {
        if (critendangereddata[i].properties.critendangeredname == name) {
            highlight.push(critendangereddata[i]);
        }
    };
    new mapboxgl.Popup().setLngLat(coordinates).setHTML(name).addTo(map);
    map.getSource('currentcritendangered').setData({
        "type": "FeatureCollection",
        "features": highlight
    });
});
// Change the cursor to a pointer when the mouse is over the critendangeredbirds layer.
map.on('mouseenter', 'critendangeredbirds', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'critendangeredbirds', function () {
    map.getCanvas().style.cursor = '';
});




