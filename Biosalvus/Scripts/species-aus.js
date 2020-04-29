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
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('NSW');
        setAllStateFlagOFF(); //turn of all state flags
        nswstate = true;
        dynamicChart();
        map.setPaintProperty(
            'NSW',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NSW',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('NSW');
    });
    // When a click event occurs on a feature in the AUSTRALIAN CAPITAL TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'ACT', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('ACT');
        setAllStateFlagOFF(); //turn of all state flags
        actstate = true;
        dynamicChart();
        map.setPaintProperty(
            'ACT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'ACT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('ACT');
    });
    // When a click event occurs on a feature in the SOUTH AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'SA', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('SA');
        setAllStateFlagOFF(); //turn of all state flags
        sastate = true;
        dynamicChart();
        map.setPaintProperty(
            'SA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'SA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('SA');
    });
    // When a click event occurs on a feature in the VICTORIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'VIC', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('VIC');
        setAllStateFlagOFF(); //turn of all state flags
        vicstate = true;
        dynamicChart();
        map.setPaintProperty(
            'VIC',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'VIC',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('VIC');
    });
    // When a click event occurs on a feature in the TASMANIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'TAS', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('TAS');
        setAllStateFlagOFF(); //turn of all state flags
        tasstate = true;
        dynamicChart();
        map.setPaintProperty(
            'TAS',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'TAS',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('TAS');
    });
    // When a click event occurs on a feature in the QUEENSLAND layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'QLD', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('QLD');
        setAllStateFlagOFF(); //turn of all state flags
        qldstate = true;
        dynamicChart();
        map.setPaintProperty(
            'QLD',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'QLD',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('QLD');
    });
    // When a click event occurs on a feature in the WESTERN AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'WA', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        resetCountButtonValue();
        setStatusButtonCountValue('WA');
        setAllStateFlagOFF(); //turn of all state flags
        wastate = true;
        dynamicChart();
        map.setPaintProperty(
            'WA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'WA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('WA');
    });
    // When a click event occurs on a feature in the NORTHEN TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'NT', function (e) {
        //hideLegend();
        resetStateFilter();
        //resetRankingValue();
        setStatusButtonCountValue('NT');
        setAllStateFlagOFF(); //turn of all state flags
        ntstate = true;
        dynamicChart();
        map.setPaintProperty(
            'NT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        $('#statefilter').html('NT');
    });

    //BUTTONS INTERACTIONS
    document.getElementById("refreshbtn").addEventListener("click", function () {
        setAllStateFlagOFF();
        setAllStatusFlagOFF();
        resetStatusBtnBorderColor();
        resetStateFilter();
        resetCountInitialValue();
        resetRankingValue();
    });
    document.getElementById("vulnerablebutton").addEventListener("click", function () {     
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(vulnerablearray);
            setLegendCountValues(vulnerablearray);
            setAllStatusFlagOFF();
            vulnerable = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("vulnerablebutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Vulnerable');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || critendangered == true ||
                extinct == true || wildextinct == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(vulnerablearray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("vulnerablebutton").style.borderColor = 'red'; //Button Highlight Toggle
                vulnerable = true;
                dynamicChart();
                $('#statusfilter').html('Vulnerable');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(vulnerablearray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("vulnerablebutton").style.borderColor = 'red'; //Button Highlight Toggle
                vulnerable = true;
                dynamicChart();
                $('#statusfilter').html('Vulnerable');
            }          
        }
    });
    document.getElementById("wildextinctbutton").addEventListener("click", function () {     
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(extinctinwildarray);
            setLegendCountValues(extinctinwildarray);
            setAllStatusFlagOFF();
            wildextinct = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("wildextinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Extinct in wild');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || critendangered == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(extinctinwildarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("wildextinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
                wildextinct = true;
                dynamicChart();
                $('#statusfilter').html('Extinct in wild');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(extinctinwildarray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("wildextinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
                wildextinct = true;
                dynamicChart();
                $('#statusfilter').html('Extinct in wild');
            }
        }
    });
    document.getElementById("endangeredbutton").addEventListener("click", function () {
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(endangeredarray);
            setLegendCountValues(endangeredarray);
            setAllStatusFlagOFF();
            endangered = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("endangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Endangered');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || vulnerable == true || critendangered == true ||
                extinct == true || wildextinct == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(endangeredarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("endangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
                endangered = true;
                dynamicChart();
                $('#statusfilter').html('Endangered');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(endangeredarray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("endangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
                endangered = true;
                dynamicChart();
                $('#statusfilter').html('Endangered');
            }

        }
    });
    document.getElementById("critendangeredbutton").addEventListener("click", function () {
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(critendangeredarray);
            setLegendCountValues(critendangeredarray);
            setAllStatusFlagOFF();
            critendangered = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("critendangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Critically Endangered');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(critendangeredarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("critendangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
                critendangered = true;
                dynamicChart();
                $('#statusfilter').html('Critically Endangered');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(critendangeredarray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("critendangeredbutton").style.borderColor = 'red'; //Button Highlight Toggle
                critendangered = true;
                dynamicChart();
                $('#statusfilter').html('Critically Endangered');
            }
        }
    });
    document.getElementById("conservationbutton").addEventListener("click", function () {
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(conservationarray);
            setLegendCountValues(conservationarray);
            setAllStatusFlagOFF();
            conservation = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Conservation Dependent');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (critendangered == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(conservationarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                $('#statusfilter').html('Conservation Dependent');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(conservationarray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                $('#statusfilter').html('Conservation Dependent');
            }
        }
    });
    document.getElementById("extinctbutton").addEventListener("click", function () {
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(extinctarray);
            setLegendCountValues(extinctarray);
            setAllStatusFlagOFF();
            extinct = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("extinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Extinct');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || wildextinct == true ||
                critendangered == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(extinctarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("extinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
                extinct = true;
                dynamicChart();
                $('#statusfilter').html('Extinct');
            }
            else { //NO OTHER BUTTON CLICKED
                showGroupingbtns();
                setLegendCountValues(extinctarray);
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("extinctbutton").style.borderColor = 'red'; //Button Highlight Toggle
                extinct = true;
                dynamicChart();
                $('#statusfilter').html('Extinct');
            }
        }
    });
    document.getElementById("conservationbutton").addEventListener("click", function () {
        if (nswstate == false && actstate == false && vicstate == false && qldstate == false
            && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
            showLegend();
            resetStateFilter();
            resetRankingValue();
            displayStateFilter(conservationarray);
            setLegendCountValues(conservationarray);
            setAllStatusFlagOFF();
            conservation = true;
            resetStatusBtnBorderColor(); //Button Highlight Toggle
            document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
            $('#statusfilter').html('Conservation Dependent');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (critendangered == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                showGroupingbtns();
                resetRankingValue();
                setLegendCountValues(conservationarray);
                setAllStatusFlagOFF();
                resetStatusBtnBorderColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                $('#statusfilter').html('Conservation Dependent');
            }
            else { //NO OTHER BUTTON CLICKED
                setLegendCountValues(conservationarray);
                showGroupingbtns();
                resetStatusBtnBorderColor(); //Button Highlight Toggle              
                document.getElementById("conservationbutton").style.borderColor = 'red'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                $('#statusfilter').html('Conservation Dependent');
            }
        }
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

//Function to Reset border colour in Status Button to white
const statusbtnarray = ['vulnerablebutton', 'conservationbutton', 'endangeredbutton', 'critendangeredbutton', 'wildextinctbutton', 'extinctbutton'];
function resetStatusBtnBorderColor() {
    for (i = 0; i < statusbtnarray.length; i++) {
        document.getElementById(statusbtnarray[i]).style.borderColor = 'white';
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

function showGroupingbtns() {
    document.getElementById("groupingbtns").style.display = "block";
}


//sets all state boolean flag to False
function setAllStateFlagOFF() {
    nswstate = false;
    actstate = false;
    vicstate = false;
    qldstate = false;
    tasstate = false;
    ntstate = false;
    sastate = false;
    wastate = false;

}

//sets all status boolean flag to False
function setAllStatusFlagOFF() {
    vulnerable = false;
    endangered = false;
    critendangered = false;
    conservation = false;
    extinct = false;
    wildextinct = false;
    vulnerable = false;
}



//CHARTS.JS GRAPHS JAVASCRIPTS
var countgroupingarray = [];
$(".speciescountbygroupings").each(function () {
    var speciestotalcount = $(".speciestotalcount", this).text().trim();
    var speciescountstatus = $(".speciescountstatus", this).text().trim();
    var speciescountstate = $(".speciescountstate", this).text().trim();
    var speciescountgrouping = $(".speciescountgrouping", this).text().trim();
    var temp = {
        "totalcount": speciestotalcount,
        "status": speciescountstatus,
        "state": speciescountstate,
        "grouping": speciescountgrouping
    };
    countgroupingarray.push(temp);
});

var barChartData = {
    datakeys: ['Amphibians', 'Birds', 'Insects', 'Mammals', 'Reptiles', 'Others'],
    labels: ['Amphibians', 'Birds', 'Insects', 'Mammals', 'Reptiles', 'Others'],
    datasets: [{
        label: 'Animalia',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};
var ctx = document.getElementById('groupChart').getContext('2d');
var groupChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: barChartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        events: ['click']
    }
});

//Sample On Click
document.getElementById("groupChart").onclick = function (evt) {
    var activePoints = groupChart.getElementAtEvent(evt);
    var theElement = groupChart.config.data.datasets[activePoints[0]._datasetIndex].data[activePoints[0]._index];
    var theKey = groupChart.config.data.datakeys[activePoints[0]._index];
    console.log(activePoints);
    console.log(theElement);
    console.log(theKey);
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter(theKey, '3');
}

//'state' = String State Code i.e. ACT,VIC,NSW
//'status' = String Status i.e. Vulnerable, Endangered.
function updateChart(state, status) {
    var array = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < countgroupingarray.length; i++) {
        if (countgroupingarray[i].state == state
            && countgroupingarray[i].status == status) {
            switch (countgroupingarray[i].grouping) {
                case "Amphibians":
                    array[0] = countgroupingarray[i].totalcount;
                    break;
                case "Birds":
                    array[1] = countgroupingarray[i].totalcount;
                    break;
                case "Insects":
                    array[2] = countgroupingarray[i].totalcount;
                    break;
                case "Mammals":
                    array[3] = countgroupingarray[i].totalcount;
                    break;
                case "Reptiles":
                    array[4] = countgroupingarray[i].totalcount;
                    break;
                case "Others":
                    array[5] = countgroupingarray[i].totalcount;
                    break;
            }
        }
    }
    for (i = 0; i < array.length; i++) { //Update the bar chart
        barChartData.datasets[0].data[i] = array[i];
    };
    groupChart.update();
}

//Apply updateChart(state, status) based on State and Status Boolean Combo
function dynamicChart() {
    //ACT
    if (actstate == true && vulnerable == true) updateChart('ACT', 'Vulnerable');
    else if (actstate == true && vulnerable == true) updateChart('ACT', 'Vulnerable');
    else if (actstate == true && conservation == true) updateChart('ACT', 'Conservation Dependent');
    else if (actstate == true && endangered == true) updateChart('ACT', 'Endangered');
    else if (actstate == true && critendangered == true) updateChart('ACT', 'Critically Endangered');
    else if (actstate == true && wildextinct == true) updateChart('ACT', 'Extinct in the wild');
    else if (actstate == true && extinct == true) updateChart('ACT', 'Extinct');
    //NSW
    else if (nswstate == true && vulnerable == true) updateChart('NSW', 'Vulnerable');
    else if (nswstate == true && vulnerable == true) updateChart('NSW', 'Vulnerable');
    else if (nswstate == true && conservation == true) updateChart('NSW', 'Conservation Dependent');
    else if (nswstate == true && endangered == true) updateChart('NSW', 'Endangered');
    else if (nswstate == true && critendangered == true) updateChart('NSW', 'Critically Endangered');
    else if (nswstate == true && wildextinct == true) updateChart('NSW', 'Extinct in the wild');
    else if (nswstate == true && extinct == true) updateChart('NSW', 'Extinct');
    //VIC
    else if (vicstate == true && vulnerable == true) updateChart('VIC', 'Vulnerable');
    else if (vicstate == true && vulnerable == true) updateChart('VIC', 'Vulnerable');
    else if (vicstate == true && conservation == true) updateChart('VIC', 'Conservation Dependent');
    else if (vicstate == true && endangered == true) updateChart('VIC', 'Endangered');
    else if (vicstate == true && critendangered == true) updateChart('VIC', 'Critically Endangered');
    else if (vicstate == true && wildextinct == true) updateChart('VIC', 'Extinct in the wild');
    else if (vicstate == true && extinct == true) updateChart('VIC', 'Extinct');
    //QLD
    else if (qldstate == true && vulnerable == true) updateChart('QLD', 'Vulnerable');
    else if (qldstate == true && vulnerable == true) updateChart('QLD', 'Vulnerable');
    else if (qldstate == true && conservation == true) updateChart('QLD', 'Conservation Dependent');
    else if (qldstate == true && endangered == true) updateChart('QLD', 'Endangered');
    else if (qldstate == true && critendangered == true) updateChart('QLD', 'Critically Endangered');
    else if (qldstate == true && wildextinct == true) updateChart('QLD', 'Extinct in the wild');
    else if (qldstate == true && extinct == true) updateChart('QLD', 'Extinct');
    //TAS
    else if (tasstate == true && vulnerable == true) updateChart('TAS', 'Vulnerable');
    else if (tasstate == true && vulnerable == true) updateChart('TAS', 'Vulnerable');
    else if (tasstate == true && conservation == true) updateChart('TAS', 'Conservation Dependent');
    else if (tasstate == true && endangered == true) updateChart('TAS', 'Endangered');
    else if (tasstate == true && critendangered == true) updateChart('TAS', 'Critically Endangered');
    else if (tasstate == true && wildextinct == true) updateChart('TAS', 'Extinct in the wild');
    else if (tasstate == true && extinct == true) updateChart('TAS', 'Extinct');
    //NT
    else if (ntstate == true && vulnerable == true) updateChart('NT', 'Vulnerable');
    else if (ntstate == true && vulnerable == true) updateChart('NT', 'Vulnerable');
    else if (ntstate == true && conservation == true) updateChart('NT', 'Conservation Dependent');
    else if (ntstate == true && endangered == true) updateChart('NT', 'Endangered');
    else if (ntstate == true && critendangered == true) updateChart('NT', 'Critically Endangered');
    else if (ntstate == true && wildextinct == true) updateChart('NT', 'Extinct in the wild');
    else if (ntstate == true && extinct == true) updateChart('NT', 'Extinct');
    //WA
    else if (wastate == true && vulnerable == true) updateChart('WA', 'Vulnerable');
    else if (wastate == true && vulnerable == true) updateChart('WA', 'Vulnerable');
    else if (wastate == true && conservation == true) updateChart('WA', 'Conservation Dependent');
    else if (wastate == true && endangered == true) updateChart('WA', 'Endangered');
    else if (wastate == true && critendangered == true) updateChart('WA', 'Critically Endangered');
    else if (wastate == true && wildextinct == true) updateChart('WA', 'Extinct in the wild');
    else if (wastate == true && extinct == true) updateChart('WA', 'Extinct');
    //SA
    else if (sastate == true && vulnerable == true) updateChart('SA', 'Vulnerable');
    else if (sastate == true && vulnerable == true) updateChart('SA', 'Vulnerable');
    else if (sastate == true && conservation == true) updateChart('SA', 'Conservation Dependent');
    else if (sastate == true && endangered == true) updateChart('SA', 'Endangered');
    else if (sastate == true && critendangered == true) updateChart('SA', 'Critically Endangered');
    else if (sastate == true && wildextinct == true) updateChart('SA', 'Extinct in the wild');
    else if (sastate == true && extinct == true) updateChart('SA', 'Extinct');
}

document.getElementById('amphibiansbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Amphibians', '3');
});
document.getElementById('birdsbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Birds', '3');
});
document.getElementById('insectsbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Insects', '3');
});
document.getElementById('mammalsbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Mammals', '3');
});
document.getElementById('reptilesbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Reptiles', '3');
});
document.getElementById('othersbtn').addEventListener("click", function () { //PASS
    displayAllTableRow("speciesbygroupings");
    groupingTableDisplayFilter('Others', '3');
});

//'filter' determines the String Text Filter
//'columnindex' determines the Table Column
function groupingTableDisplayFilter(filter, columnindex) {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    table = document.getElementById("speciesbygroupings");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[columnindex];
        if (td) {
            txtValue = td.textContent.trim() || td.innerText.trim();
            if (txtValue == filter) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function displayAllTableRow(tablename) {
    // Declare variables
    var table, tr, i;
    table = document.getElementById(tablename);
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and show all rows
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "block";
    }
}