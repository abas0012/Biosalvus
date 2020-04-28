/**
* This is a JavaScript to call MapBox API to load the maps of Species Australia db.
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 22/04/2020
*/
var nswstate = false; //Boolean Flag for NSW
var actstate = false; //Boolean Flag for ACT
var vicstate = false; //Boolean Flag for VIC
var qldstate = false; //Boolean Flag for QLD
var sastate = false; //Boolean Flag for SA
var ntstate = false; //Boolean Flag for NT
var wastate = false; //Boolean Flag for WA
var tasstate = false; //Boolean Flag for TAS 
var vulnerable = false; //Boolean Flag for Vulnerable Status 
var conservation = false;//Boolean Flag for Conservation Status 
var endangered = false;//Boolean Flag for Endangered Status 
var critendangered = false;//Boolean Flag for Critically Endangered Status 
var extinct = false;//Boolean Flag for Extinct Status 
var wildextinct = false;//Boolean Flag for Extinct in Wild Status 

const statecodearray = ['ACT', 'VIC', 'NSW', 'SA', 'WA', 'QLD', 'TAS', 'NT'];
const rankcountarray = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8'];
//Array to hold Count by State and Status
var countstatestatusarray = [];
$(".countbystatestatusrows").each(function () {
    var statusbystatestatus = $(".statusbystatestatus", this).text().trim();
    var statebystatestatus = $(".statebystatestatus", this).text().trim();
    var totalcountbystatestatus = $(".totalcountbystatestatus", this).text().trim();
    var temp = {
        "status": statusbystatestatus,
        "state": statebystatestatus,
        "totalcount": totalcountbystatestatus
    };
    countstatestatusarray.push(temp);
});

//Array to hold Count by Status
var countbystatusarray = [];
$(".countbystatusrow").each(function () {
    var status = $(".status", this).text().trim();
    var totalcount = $(".totalcount", this).text().trim();
    var temp = {
        "status": status,
        "totalcount": totalcount
    };
    countbystatusarray.push(temp);
});

//"Initial Count Per Status"
var statuscountarray = [];
$(".countbystatusrow").each(function () {
    var status = $(".status", this).text().trim();
    var totalcount = $(".totalcount", this).text().trim();
    var temp = {
        "status": status,
        "totalcount": totalcount,
    };
    statuscountarray.push(temp);
});

//MAP SOURCE CODES STARTS HERE
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q"; //Mapbox API Key
mapboxgl.accessToken = TOKEN;
var map = new mapboxgl.Map({
    container: 'species-map',
    style: 'mapbox://styles/mapbox/light-v10', //light map
    zoom: 3,
    center: [131.0369, -25.3444] //Uluru Longitude (Center of Australia)
});
var hoveredStateId = null;
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
        //'data': '../Content/GeoJson/data-gov-au-wa-geojson-polygon.json'
        
    });

    // Add a source for NORTHEN TERRITORY state polygons.
    map.addSource('nt', {
        'type': 'geojson',
        'data': 'https://data.gov.au/geoserver/nt-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_5162e11c_3259_4894_8b9e_f44540b6cb11&outputFormat=json'
    });

    //STATES ADD LAYER SECTION
    // Add a layer showing NEW SOUTH WALES state polygons.
    map.addLayer({
        'id': 'NSW',
        'type': 'fill',
        'source': 'nsw',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)', //Yellow
            'fill-outline-color': 'rgba(255, 255, 0, 1)',//Yellow
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing AUSTRALIAN CAPITAL TERRITORY state polygons.
    map.addLayer({
        'id': 'ACT',
        'type': 'fill',
        'source': 'act',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing SOUTH AUSTRALIA state polygons.
    map.addLayer({
        'id': 'SA',
        'type': 'fill',
        'source': 'sa',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing VICTORIA state polygons.
    map.addLayer({
        'id': 'VIC',
        'type': 'fill',
        'source': 'vic',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing TASMANIA state polygons.
    map.addLayer({
        'id': 'TAS',
        'type': 'fill',
        'source': 'tas',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing QUEENSLAND state polygons.
    map.addLayer({
        'id': 'QLD',
        'type': 'fill',
        'source': 'qld',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
    // Add a layer showing WESTERN AUSTRALIA state polygons.
    map.addLayer({
        'id': 'WA',
        'type': 'fill',
        'source': 'wa',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });

    // Add a layer showing NORTHEN TERRITORY state polygons.
    map.addLayer({
        'id': 'NT',
        'type': 'fill',
        'source': 'nt',
        'paint': {
            'fill-color': 'rgba(255, 255, 0, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 0, 1)',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });

    //STATES ON CLICK FUNCTIONS
    // When a click event occurs on a feature in the NEW SOUTH WALES layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'NSW', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('NSW');
        map.setPaintProperty(
            'NSW',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NSW',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('NSW');
    });
    // When a click event occurs on a feature in the AUSTRALIAN CAPITAL TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'ACT', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('ACT');
        map.setPaintProperty(
            'ACT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'ACT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('ACT');
    });
    // When a click event occurs on a feature in the SOUTH AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'SA', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('SA');
        map.setPaintProperty(
            'SA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'SA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('SA');
    });
    // When a click event occurs on a feature in the VICTORIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'VIC', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('VIC');
        map.setPaintProperty(
            'VIC',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'VIC',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('VIC');
    });
    // When a click event occurs on a feature in the TASMANIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'TAS', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('TAS');
        map.setPaintProperty(
            'TAS',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'TAS',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('TAS');
    });
    // When a click event occurs on a feature in the QUEENSLAND layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'QLD', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('QLD');
        map.setPaintProperty(
            'QLD',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'QLD',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('QLD');
    });
    // When a click event occurs on a feature in the WESTERN AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'WA', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('WA');
        map.setPaintProperty(
            'WA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'WA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('WA');
    });
    // When a click event occurs on a feature in the NORTHEN TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'NT', function (e) {
        hideLegend();
        resetStateFilter();
        resetRankingValue();
        setStatusButtonCountValue('NT');
        map.setPaintProperty(
            'NT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#mapfilter').html('NT');
    });

    //BUTTONS INTERACTIONS
    document.getElementById("vulnerablebutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(vulnerablearray);
        setLegendCountValues(vulnerablearray);
        $('#mapfilter').html('Vulnerable');
    });
    document.getElementById("wildextinctbutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(extinctinwildarray);
        setLegendCountValues(extinctinwildarray);
        $('#mapfilter').html('Extinct in wild');
    });
    document.getElementById("endangeredbutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(endangeredarray);
        setLegendCountValues(endangeredarray);
        $('#mapfilter').html('Endangered');
    });
    document.getElementById("critendangeredbutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(critendangeredarray);
        setLegendCountValues(critendangeredarray);
        $('#mapfilter').html('Critically Endangered');
    });
    document.getElementById("conservationbutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(conservationarray);
        setLegendCountValues(conservationarray);
        $('#mapfilter').html('Conservation Dependent');
    });
    document.getElementById("extinctbutton").addEventListener("click", function () {
        showLegend();
        resetCountInitialValue();
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(extinctarray);
        setLegendCountValues(extinctarray);
        $('#mapfilter').html('Extinct');
    });
});

//jQuery selector
//Arrays To Hold Species Data in Ranking Order grouped by Status
//"Vulnerable"
var vulnerablearray = [];
$(".vulnerablerows").each(function () {
    var statevulnerable = $(".statevulnerable", this).text().trim();
    var totalcountvulnerable = $(".totalcountvulnerable", this).text().trim();
    var temp = {
        "state": statevulnerable,
        "totalcount": totalcountvulnerable,
    };
    vulnerablearray.push(temp);
});
//"Extinct in the wild"
var extinctinwildarray = [];
$(".extinctinwildrows").each(function () {
    var stateextinctinwild = $(".stateextinctinwild", this).text().trim();
    var totalcountextinctinwild = $(".totalcountextinctinwild", this).text().trim();
    var temp = {
        "state": stateextinctinwild,
        "totalcount": totalcountextinctinwild,
    };
    extinctinwildarray.push(temp);
});
//"Endangered"
var endangeredarray = [];
$(".endangeredrows").each(function () {
    var stateendangered = $(".stateendangered", this).text().trim();
    var totalcountendangered = $(".totalcountendangered", this).text().trim();
    var temp = {
        "state": stateendangered,
        "totalcount": totalcountendangered,
    };
    endangeredarray.push(temp);
});
//"Critically Endangered"
var critendangeredarray = [];
$(".critendangeredrows").each(function () {
    var statecritendangered = $(".statecritendangered", this).text().trim();
    var totalcountcritendangered = $(".totalcountcritendangered", this).text().trim();
    var temp = {
        "state": statecritendangered,
        "totalcount": totalcountcritendangered,
    };
    critendangeredarray.push(temp);
});
//"Conservation Dependent"
var conservationarray = [];
$(".conservationrows").each(function () {
    var stateconservation = $(".stateconservation", this).text().trim();
    var totalcountconservation = $(".totalcountconservation", this).text().trim();
    var temp = {
        "state": stateconservation,
        "totalcount": totalcountconservation,
    };
    conservationarray.push(temp);
});
//"Extinct"
var extinctarray = [];
$(".extinctrows").each(function () {
    var stateextinct = $(".stateextinct", this).text().trim();
    var totalcountextinct = $(".totalcountextinct", this).text().trim();
    var temp = {
        "state": stateextinct,
        "totalcount": totalcountextinct,
    };
    extinctarray.push(temp);
});

function resetCountInitialValue() {
    for (i = 0; i < countbystatusarray.length; i++) {
        switch (countbystatusarray[i].status) {
            case "Vulnerable":
                $('#vulnerablecnt').html(countbystatusarray[i].totalcount);
                break;
            case "Critically Endangered":
                $('#critendangeredncnt').html(countbystatusarray[i].totalcount);
                break;
            case "Conservation Dependent":
                $('#conservationcnt').html(countbystatusarray[i].totalcount);
                break;
            case "Endangered":
                $('#endangeredcnt').html(countbystatusarray[i].totalcount);
                break;
            case "Extinct":
                $('#extinctcnt').html(countbystatusarray[i].totalcount);
                break;
            case "Extinct in the wild":
                $('#wildextinctcnt').html(countbystatusarray[i].totalcount);
                break;
        }
    }
}

//Function to set the count values on Status Button based on State selected.
function setStatusButtonCountValue(state) {
    for (i = 0; i < countstatestatusarray.length; i++) {
        if (countstatestatusarray[i].state == state) {
            switch (countstatestatusarray[i].status) {
                case "Vulnerable":
                    $('#vulnerablecnt').html(countstatestatusarray[i].totalcount);
                    break;
                case "Critically Endangered":
                    $('#critendangeredncnt').html(countstatestatusarray[i].totalcount);
                    break;
                case "Conservation Dependent":
                    $('#conservationcnt').html(countstatestatusarray[i].totalcount);
                    break;
                case "Endangered":
                    $('#endangeredcnt').html(countstatestatusarray[i].totalcount);
                    break;
                case "Extinct":
                    $('#extinctcnt').html(countstatestatusarray[i].totalcount);
                    break;
                case "Extinct in the wild":
                    $('#wildextinctcnt').html(countstatestatusarray[i].totalcount);
                    break;
            }
        }
    }
}

//Function to set the the Legend Values for Vulnerable Status
function setLegendCountValues(temparray) {
    for (i = 0; i < temparray.length; i++) {
        switch (i) {
            case 0:
                document.getElementById("rank1").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 1:
                document.getElementById("rank2").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 2:
                document.getElementById("rank3").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 3:
                document.getElementById("rank4").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 4:
                document.getElementById("rank5").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 5:
                document.getElementById("rank6").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 6:
                document.getElementById("rank7").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
            case 7:
                document.getElementById("rank8").innerHTML = temparray[i].state + ": " + temparray[i].totalcount;
                break;
        }
    }
}

//Function to change Filter of States by Status in Ranking Order
function displayStateFilter(temparray) {
    for (i = 0; i < temparray.length; i++) {
        switch (i) {
            case 0: //RANK 1
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(51, 0, 0, 0.4)'); //Dark Maroon
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(51, 0, 0, 1)'); //Dark Maroon
                break;
            case 1: //RANK 2
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(165, 42, 42, 0.4)'); //Red
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(165, 42, 42, 1)'); //Red
                break;
            case 2: //RANK 3
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(255, 69, 0, 0.4)'); //Brown
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(255, 69, 0, 1)'); //Brown
                break;
            case 3: //RANK 4
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(255, 165, 0,0.4)'); //Orange
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(255, 165, 0,1)'); //Orange
                break;
            case 4: //RANK 5
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(184, 181, 35, 0.4)'); //Mustard Yellow
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(184, 181, 35, 1)'); //Mustard Yellow
                break;
            case 5: //RANK 6
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(245, 225, 7, 0.4)'); //Yellow
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(245, 225, 7, 1)'); //Yellow
                break;
            case 6: //RANK 7
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(169, 169, 169, 0.4)'); //Dark Gray
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(169, 169, 169, 1)'); //Dark Gray
                break;
            case 7: //RANK 8
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(211, 211, 211, 0.4)'); //Light Gray
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(211, 211, 211, 1)'); //Light Gray
                break;
        }
    }
}

//Function to Reset Count in Status Button to 0
const statuscntbtnarray = ['vulnerablecnt', 'conservationcnt', 'endangeredcnt', 'critendangeredncnt', 'wildextinctcnt', 'extinctcnt'];
function resetCountButtonValue() {
    for (i = 0; i < statuscntbtnarray.length; i++) {
        document.getElementById(statuscntbtnarray[i]).innerHTML = 0;
    }
}

//Function to Reset State Fill Colour to 'Default'
function resetStateFilter() {
    for (i = 0; i < statecodearray.length; i++) {
        map.setPaintProperty(
            statecodearray[i],
            'fill-color',
            'rgba(0, 0, 0, 0.1)'); //Yellow
        map.setPaintProperty(
            statecodearray[i],
            'fill-outline-color',
            'rgba(255, 255, 0, 1)'); //Yellow
    }
}

//Function to Reset Rank Count value to N/A
function resetRankingValue() {
    for (i = 0; i < rankcountarray.length; i++) {
        document.getElementById(rankcountarray[i]).innerHTML = 'N/A';
    }
}

function hideLegend() {
    document.getElementById("legend").style.display = "none";
}

function showLegend() {
    document.getElementById("legend").style.display = "block";
}

//MAP CONTROLS
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));;
map.addControl(new mapboxgl.NavigationControl());

//// Change the cursor to a pointer when the mouse is over the places layer.
//map.on('mouseenter', 'places', function () {
//    map.getCanvas().style.cursor = 'pointer';
//});
//// Change it back to a pointer when it leaves.
//map.on('mouseleave', 'places', function () {
//    map.getCanvas().style.cursor = '';
//});

//// When the user moves their mouse over the state-fill layer, we'll update the
//// feature state for the feature under the mouse.
//map.on('mousemove', 'NSW', function (e) {
//    if (e.features.length > 0) {
//        if (hoveredStateId) {
//            map.setFeatureState(
//                { source: 'nsw', id: hoveredStateId },
//                { hover: false }
//            );
//        }
//        hoveredStateId = e.features[0].id;
//        map.setFeatureState(
//            { source: 'nsw', id: hoveredStateId },
//            { hover: true }
//        );
//    }
//});

//// When the mouse leaves the state-fill layer, update the feature state of the
//// previously hovered feature.
//map.on('mouseleave', 'NSW', function () {
//    if (hoveredStateId) {
//        map.setFeatureState(
//            { source: 'nsw', id: hoveredStateId },
//            { hover: false }
//        );
//    }
//    hoveredStateId = null;
//});


