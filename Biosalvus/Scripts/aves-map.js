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
var fires = [];
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



//Fire Coordinates
$(".firecoordinates").each(function () {
    var firelatitude = $(".firelatitude", this).text().trim();
    var firelongitude = $(".firelongitude", this).text().trim();
    var firecity = $(".firecity", this).text().trim();
    var firedate = $(".firedate", this).text().trim();
    // Create a point data structure to hold the values.
    var point = {
        "firelatitude": firelatitude,
        "firelongitude": firelongitude,
        "firecity": firecity,
        "firedate": firedate
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
            "firecity": fires[i].firecity,
            "firedate": fires[i].firedate,
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
    maxZoom: 7,
    minZoom: 5,
    center: [endangeredarray[i].endangeredlongitude, endangeredarray[i].endangeredlatitude]
    //center: [144.946457, -37.840935] //Victoria, AUS
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
                'circle-color': 'rgba(0,0,0,1)', //BLACK
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
                'circle-color': 'rgba(0,0,0,1)', //BLACK
                'circle-radius': 3
            },
            'layout': {
                'visibility': 'none'
            }
        }
    );
    //Fire Layer
    map.addLayer(
        {
            'id': 'firelayer',
            'type': 'circle',
            'source': 'firedatasource',
            'paint': {
                'circle-color': 'rgba(255,0,0,1)', //RED
                'circle-radius': 2
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

    //BUTTONS INTERACTIONS
    document.getElementById("vulnerablebtn").addEventListener("click", function () {
        hideBirds();
        setAllStatusFlagOFF();
        vulnerable = true;
        map.setLayoutProperty(
            'vulnerablebirds',
            'visibility',
            'visible'
        );
        showVulnerableList();
        hideCritEndangeredList();
        hideEndangeredList();
    });
    document.getElementById("endangeredbtn").addEventListener("click", function () {
        hideBirds();
        setAllStatusFlagOFF();
        endangered = true;
        map.setLayoutProperty(
            'endangeredbirds',
            'visibility',
            'visible'
        );
        showEndangeredList();
        hideVulnerableList();
        hideCritEndangeredList();
    });
    document.getElementById("critendangeredbtn").addEventListener("click", function () {
        hideBirds();
        setAllStatusFlagOFF();
        map.setLayoutProperty(
            'critendangeredbirds',
            'visibility',
            'visible'
        );
        hideVulnerableList();
        hideEndangeredList();
        showCritEndangeredList();
    });
});
//HIDE AND SHOW BIRDS LISTS
var vulnerablelist = ['vulnerableheader', 'bartailedgodwitlst', 'bassianthrushlst', 'blackbrowedalbatrosslst', 'bluepetrellst'
    , 'capebarrengooselst', 'crestedshriketitlst', 'fairyternlst', 'goldenwhistlerlst', 'greenrosellalst'
    , 'horsfieldbushlarklst', 'malleefowllst', 'northerngiantpetrellst', 'piedcurrawonglst', 'redloredwhisterlst'
    , 'regentparrotlst', 'shyalbatrosslst', 'spinetailedswiftlst', 'superbparrotlst', 'wanderingalbatrosslst'
    , 'whitewingedfairywrenlst', 'nalst'];
function hideVulnerableList() {
    for (i = 0; i < vulnerablelist.length; i++) {
        document.getElementById(i).style.display = "none";
    };
};
function showVulnerableList() {
    for (i = 0; i < vulnerablelist.length; i++) {
        document.getElementById(i).style.display = "block";
    };
};
var endangeredlist = ['endangeredheader', 'australasianbitternlst', 'azurekingfisherlst', 'blackearedminerlst', 'brownthornbilllst'
    , 'easternbristlebirdlst', 'easterngroundparrotlst', 'glossyblackcockatoolst', 'helmetedhoneyeaterlst', 'hoodedrobinlst'
    , 'huahoulst', 'malleeemuwrenlst', 'redtailedblackcockatoolst', 'southernemuwrenlst', 'southerngiantpetrellst'
    , 'swiftparrotlst', 'wedgetailedeaglelst', 'yellowtuftedhoneyeaterlst'];
function hideEndangeredList() {
    for (i = 0; i < endangeredlist.length; i++) {
        document.getElementById(i).style.display = "none";
    };
};
function showEndangeredList() {
    for (i = 0; i < endangeredlist.length; i++) {
        document.getElementById(i).style.display = "block";
    };
};
var critEndangeredlist = ['critendangeredheader', 'curlewsandpiperlst', 'easterncurlewlst', 'greatknotlst', 'orangebelliedparrotlst'
    , 'plainswandererlst', 'regenthoneyeaterlst', 'spottedquailthrushlst'];
function hideCritEndangeredList() {
    for (i = 0; i < critEndangeredlist.length; i++) {
        document.getElementById(i).style.display = "none";
    };
};
function showCritEndangeredList() {
    for (i = 0; i < critEndangeredlist.length; i++) {
        document.getElementById(i).style.display = "block";
    };
};
//Show Bird coordinates if Status is true.
function showBirds() {
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
        'vulnerablebirds',
        'visibility',
        'none'
    );
}

//sets all status boolean flag to False
function setAllStatusFlagOFF() {
    vulnerable = false;
    endangered = false;
    critendangered = false;
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

//DESCRIPTION INTERACTION
var allBirdsDesc = ['australasianbittern', 'azurekingfisher', 'bartailedgodwit', 'bassianthrush', 'blackbrowedalbatross'
    , 'blackearedminer', 'bluepetrel', 'brownthornbill', 'capebarrengoose', 'crestedshriketit'
    , 'curlewsandpiper', 'easternbristlebird', 'easterncurlew', 'easterngroundparrot', 'fairytern'
    , 'glossyblackcockatoo', 'goldenwhistler', 'greatknot', 'greenrosella', 'helmetedhoneyeater'
    , 'hoodedrobin', 'horsfieldbushlark', 'huahou', 'malleeemuwren', 'malleefowl', 'maskedowl', 'northerngiantpetrel'
    , 'orangebelliedparrot', 'piedcurrawong', 'plainswanderer', 'redloredwhister', 'redtailedblackcockatoo'
    , 'regenthoneyeater', 'regentparrot', 'shyalbatross', 'southernemuwren', 'southerngiantpetrel', 'spinetailedswift'
    , 'spottedquailthrush', 'superbparrot', 'swiftparrot', 'wanderingalbatross', 'wedgetailedeagle'
    , 'whitewingedfairywren', 'yellowtuftedhoneyeater'];
function hideAllBirdDescription() {
    for (i = 0; i < allBirdsDesc.length; i++) {
        document.getElementById(i).style.display = "none";
    };
};

document.getElementById("bartailedgodwitlst").addEventListener("click", function () {
    document.getElementById('bartailedgodwit').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("bassianthrushlst").addEventListener("click", function () {
    document.getElementById('bassianthrush').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("blackbrowedalbatrosslst").addEventListener("click", function () {
    document.getElementById('blackbrowedalbatross').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("bluepetrellst").addEventListener("click", function () {
    document.getElementById('bluepetrel').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("capebarrengooselst").addEventListener("click", function () {
    document.getElementById('capebarrengoose').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("crestedshriketitlst").addEventListener("click", function () {
    document.getElementById('crestedshriketit').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("fairyternlst").addEventListener("click", function () {
    document.getElementById('fairytern').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("goldenwhistlerlst").addEventListener("click", function () {
    document.getElementById('goldenwhistler').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("greenrosellalst").addEventListener("click", function () {
    document.getElementById('greenrosella').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("horsfieldbushlarklst").addEventListener("click", function () {
    document.getElementById('horsfieldbushlark').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("malleefowllst").addEventListener("click", function () {
    document.getElementById('malleefowl').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("northerngiantpetrellst").addEventListener("click", function () {
    document.getElementById('northerngiantpetrel').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("piedcurrawonglst").addEventListener("click", function () {
    document.getElementById('piedcurrawong').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("redloredwhisterlst").addEventListener("click", function () {
    document.getElementById('redloredwhister').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("regentparrotlst").addEventListener("click", function () {
    document.getElementById('regentparrot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("shyalbatrosslst").addEventListener("click", function () {
    document.getElementById('shyalbatross').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("spinetailedswiftlst").addEventListener("click", function () {
    document.getElementById('spinetailedswift').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("superbparrotlst").addEventListener("click", function () {
    document.getElementById('superbparrot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("wanderingalbatrosslst").addEventListener("click", function () {
    document.getElementById('wanderingalbatross').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("whitewingedfairywrenlst").addEventListener("click", function () {
    document.getElementById('whitewingedfairywren').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("australasianbitternlst").addEventListener("click", function () {
    document.getElementById('australasianbittern').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("azurekingfisherlst").addEventListener("click", function () {
    document.getElementById('azurekingfisher').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("blackearedminerlst").addEventListener("click", function () {
    document.getElementById('blackearedminer').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("brownthornbilllst").addEventListener("click", function () {
    document.getElementById('brownthornbill').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("easternbristlebirdlst").addEventListener("click", function () {
    document.getElementById('easternbristlebird').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("easterngroundparrotlst").addEventListener("click", function () {
    document.getElementById('easterngroundparrot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("glossyblackcockatoolst").addEventListener("click", function () {
    document.getElementById('glossyblackcockatoo').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("helmetedhoneyeaterlst").addEventListener("click", function () {
    document.getElementById('helmetedhoneyeater').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("hoodedrobinlst").addEventListener("click", function () {
    document.getElementById('hoodedrobin').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("huahoulst").addEventListener("click", function () {
    document.getElementById('huahou').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("malleeemuwrenlst").addEventListener("click", function () {
    document.getElementById('malleeemuwren').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("redtailedblackcockatoolst").addEventListener("click", function () {
    document.getElementById('redtailedblackcockatoo').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("southernemuwrenlst").addEventListener("click", function () {
    document.getElementById('southernemuwren').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("southerngiantpetrellst").addEventListener("click", function () {
    document.getElementById('southerngiantpetrel').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("swiftparrotlst").addEventListener("click", function () {
    document.getElementById('swiftparrot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("wedgetailedeaglelst").addEventListener("click", function () {
    document.getElementById('wedgetailedeagle').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("yellowtuftedhoneyeaterlst").addEventListener("click", function () {
    document.getElementById('yellowtuftedhoneyeater').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("curlewsandpiperlst").addEventListener("click", function () {
    document.getElementById('curlewsandpiper').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("easterncurlewlst").addEventListener("click", function () {
    document.getElementById('easterncurlew').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("greatknotlst").addEventListener("click", function () {
    document.getElementById('greatknot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("orangebelliedparrotlst").addEventListener("click", function () {
    document.getElementById('orangebelliedparrot').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("plainswandererlst").addEventListener("click", function () {
    document.getElementById('plainswanderer').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("regenthoneyeaterlst").addEventListener("click", function () {
    document.getElementById('regenthoneyeater').style.display = "block";
    hideAllBirdDescription();
});
document.getElementById("spottedquailthrushlst").addEventListener("click", function () {
    document.getElementById('spottedquailthrush').style.display = "block";
    hideAllBirdDescription();
});



////CHART.JS GRAPH
//var birdcityarray = [];
//var birdcitykey = [];
//var birdcitydata = [];
//$(".birddata").each(function () {
//    var i = 1;
//    var birdcity = $(".birdcity", this).text().trim();
//    var threatrate = $(".threatrate", this).text().trim();
//    var key = {
//        "birdcity": i + ". " + birdcity
//    };
//    var data = {
//        "threatrate": threatrate
//    };
//    birdcitykey.push(key);
//    birdcitydata.push(data);
//    i++;
//});

//var barChartData = {
//    datakeys: birdcitykey,
//    labels: birdcitykey,
//    datasets: [{
//        data: birdcitydata, //Initial Value
//        backgroundColor: [
//            'rgba(255, 99, 132, 0.2)',
//            'rgba(54, 162, 235, 0.2)',
//            'rgba(255, 206, 86, 0.2)',
//            'rgba(75, 192, 192, 0.2)',
//            'rgba(153, 102, 255, 0.2)',
//            'rgba(255, 159, 64, 0.2)'
//        ],
//        borderColor: [
//            'rgba(255, 99, 132, 1)',
//            'rgba(54, 162, 235, 1)',
//            'rgba(255, 206, 86, 1)',
//            'rgba(75, 192, 192, 1)',
//            'rgba(153, 102, 255, 1)',
//            'rgba(255, 159, 64, 1)'
//        ],
//        borderWidth: 1
//    }]
//};
//var ctx = document.getElementById('birdRankCanvas').getContext('2d');
//var groupChart = new Chart(ctx, {
//    type: 'bar',
//    data: barChartData,
//    options: {
//        scales: {
//            yAxes: [{
//                ticks: {
//                    beginAtZero: true
//                }
//            }]
//        }
//    }
//});