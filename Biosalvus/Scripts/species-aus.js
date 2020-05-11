/**
* This is a JavaScript to call MapBox API to load the maps of Species Australia db.
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 22/04/2020
*/
//STATE BOOLEAN FLAGS
var nswstate = false; //Boolean Flag for NSW
var actstate = false; //Boolean Flag for ACT
var vicstate = false; //Boolean Flag for VIC
var qldstate = false; //Boolean Flag for QLD
var sastate = false; //Boolean Flag for SA
var ntstate = false; //Boolean Flag for NT
var wastate = false; //Boolean Flag for WA
var tasstate = false; //Boolean Flag for TAS
//STATUS BOOLEAN FLAGS
var vulnerable = false; //Boolean Flag for Vulnerable Status 
var conservation = false;//Boolean Flag for Conservation Status 
var endangered = false;//Boolean Flag for Endangered Status 
var critendangered = false;//Boolean Flag for Critically Endangered Status 
var extinct = false;//Boolean Flag for Extinct Status 
var wildextinct = false;//Boolean Flag for Extinct in Wild Status 
//GROUP BOOLEAN FLAGS
var amphibians = false; //Boolean Flag for Amphibians
var birds = false; //Boolean Flag for Birds
var insects = false; //Boolean Flag for Insects
var mammals = false; //Boolean Flag for Mammals
var reptiles = false; //Boolean Flag for Reptiles
var others = false; //Boolean Flag for Others

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
    zoom: 2.8,
    center: [-224.503977, -26.902479] //Uluru Longitude (Center of Australia)
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
        dynamicTable();
        map.setPaintProperty(
            'NSW',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NSW',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'ACT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'ACT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'SA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'SA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'VIC',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'VIC',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'TAS',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'TAS',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'QLD',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'QLD',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'WA',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'WA',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };
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
        dynamicTable();
        map.setPaintProperty(
            'NT',
            'fill-color',
            'rgba(120, 25, 25, 0.4)'); //Dark Maroon
        map.setPaintProperty(
            'NT',
            'fill-outline-color',
            'rgba(120, 25, 25, 1)'); //Dark Maroon
        if (conservation == true || endangered == true || critendangered == true ||
            extinct == true || wildextinct == true || vulnerable == true) { //If a Status button is clicked
            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
        };        
        $('#statefilter').html('NT');
    });

    //BUTTONS INTERACTIONS
    document.getElementById("refreshbtn").addEventListener("click", function () {
        setAllStateFlagOFF();
        setAllStatusFlagOFF();
        resetStatusBtnColor();
        resetStateFilter();
        resetCountInitialValue();
        resetRankingValue();
        document.getElementById("speciesgroupChart").style.display = "none"; //hide Species Grouping Chart
        document.getElementById("speciesgroupTable").style.display = "none"; //hide Species Grouping Table
        $('#statefilter').html('');
        $('#statusfilter').html('');
        $('#groupfilter').html('');
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
            resetStatusBtnColor(); //Button Highlight Toggle
            document.getElementById("vulnerablebutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
            $('#statusfilter').html('Vulnerable');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || critendangered == true ||
                extinct == true || wildextinct == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetRankingValue();
                setLegendCountValues(vulnerablearray);
                setAllStatusFlagOFF();
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("vulnerablebutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                vulnerable = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Vulnerable');
            }
            else { //NO OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                setLegendCountValues(vulnerablearray);
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("vulnerablebutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                vulnerable = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Vulnerable');
            }          
        }
    });
    //document.getElementById("wildextinctbutton").addEventListener("click", function () {     
    //    if (nswstate == false && actstate == false && vicstate == false && qldstate == false
    //        && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
    //        showLegend();
    //        resetStateFilter();
    //        resetRankingValue();
    //        displayStateFilter(extinctinwildarray);
    //        setLegendCountValues(extinctinwildarray);
    //        setAllStatusFlagOFF();
    //        wildextinct = true;
    //        resetStatusBtnColor(); //Button Highlight Toggle
    //        document.getElementById("wildextinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //        $('#statusfilter').html('Extinct in wild');
    //    }
    //    if (nswstate == true || actstate == true || vicstate == true || qldstate == true
    //        || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
    //        if (conservation == true || endangered == true || critendangered == true ||
    //            extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
    //            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
    //            resetRankingValue();
    //            setLegendCountValues(extinctinwildarray);
    //            setAllStatusFlagOFF();
    //            resetStatusBtnColor(); //Button Highlight Toggle
    //            document.getElementById("wildextinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //            wildextinct = true;
    //            dynamicChart();
    //            dynamicTable();
    //            $('#statusfilter').html('Extinct in wild');
    //        }
    //        else { //NO OTHER BUTTON CLICKED
    //            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
    //            setLegendCountValues(extinctinwildarray);
    //            resetStatusBtnColor(); //Button Highlight Toggle
    //            document.getElementById("wildextinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //            wildextinct = true;
    //            dynamicChart();
    //            dynamicTable();
    //            $('#statusfilter').html('Extinct in wild');
    //        }
    //    }
    //});
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
            resetStatusBtnColor(); //Button Highlight Toggle
            document.getElementById("endangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
            $('#statusfilter').html('Endangered');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || vulnerable == true || critendangered == true ||
                extinct == true || wildextinct == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetRankingValue();
                setLegendCountValues(endangeredarray);
                setAllStatusFlagOFF();
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("endangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                endangered = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Endangered');
            }
            else { //NO OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                setLegendCountValues(endangeredarray);
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("endangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                endangered = true;
                dynamicChart();
                dynamicTable();
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
            resetStatusBtnColor(); //Button Highlight Toggle
            document.getElementById("critendangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
            $('#statusfilter').html('Critically Endangered');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (conservation == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetRankingValue();
                setLegendCountValues(critendangeredarray);
                setAllStatusFlagOFF();
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("critendangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                critendangered = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Critically Endangered');
            }
            else { //NO OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                setLegendCountValues(critendangeredarray);
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("critendangeredbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                critendangered = true;
                dynamicChart();
                dynamicTable();
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
            resetStatusBtnColor(); //Button Highlight Toggle
            document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
            $('#statusfilter').html('Conservation Dependent');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (critendangered == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetRankingValue();
                setLegendCountValues(conservationarray);
                setAllStatusFlagOFF();
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Conservation Dependent');
            }
            else { //NO OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                setLegendCountValues(conservationarray);
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Conservation Dependent');
            }
        }
    });
    //document.getElementById("extinctbutton").addEventListener("click", function () {
    //    if (nswstate == false && actstate == false && vicstate == false && qldstate == false
    //        && tasstate == false && wastate == false && ntstate == false && sastate == false) { //IF NO STATE IS HIGHLIGHTED
    //        showLegend();
    //        resetStateFilter();
    //        resetRankingValue();
    //        displayStateFilter(extinctarray);
    //        setLegendCountValues(extinctarray);
    //        setAllStatusFlagOFF();
    //        extinct = true;
    //        resetStatusBtnColor(); //Button Highlight Toggle
    //        document.getElementById("extinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //        $('#statusfilter').html('Extinct');
    //    }
    //    if (nswstate == true || actstate == true || vicstate == true || qldstate == true
    //        || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
    //        if (conservation == true || endangered == true || wildextinct == true ||
    //            critendangered == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
    //            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
    //            resetRankingValue();
    //            setLegendCountValues(extinctarray);
    //            setAllStatusFlagOFF();
    //            resetStatusBtnColor(); //Button Highlight Toggle
    //            document.getElementById("extinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //            extinct = true;
    //            dynamicChart();
    //            dynamicTable();
    //            $('#statusfilter').html('Extinct');
    //        }
    //        else { //NO OTHER BUTTON CLICKED
    //            document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
    //            setLegendCountValues(extinctarray);
    //            resetStatusBtnColor(); //Button Highlight Toggle
    //            document.getElementById("extinctbutton").style.backgroundColor = '#d68c45'; //Button Highlight Toggle
    //            extinct = true;
    //            dynamicChart();
    //            dynamicTable();
    //            $('#statusfilter').html('Extinct');
    //        }
    //    }
    //});
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
            resetStatusBtnColor(); //Button Highlight Toggle
            document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
            $('#statusfilter').html('Conservation Dependent');
        }
        if (nswstate == true || actstate == true || vicstate == true || qldstate == true
            || tasstate == true || wastate == true || ntstate == true || sastate == true) { //IF AT LEAST 1 STATE
            if (critendangered == true || endangered == true || wildextinct == true ||
                extinct == true || vulnerable == true) { //AT LEAST 1 OTHER BUTTON CLICKED
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetRankingValue();
                setLegendCountValues(conservationarray);
                setAllStatusFlagOFF();
                resetStatusBtnColor(); //Button Highlight Toggle
                document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                dynamicTable();
                $('#statusfilter').html('Conservation Dependent');
            }
            else { //NO OTHER BUTTON CLICKED
                setLegendCountValues(conservationarray);
                document.getElementById("speciesgroupChart").style.display = "block"; //show Species Grouping Block
                resetStatusBtnColor(); //Button Highlight Toggle              
                document.getElementById("conservationbutton").style.backgroundColor = 'rgba(214, 140, 69, 1)'; //Button Highlight Toggle
                conservation = true;
                dynamicChart();
                dynamicTable();
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

//Function to Reset border colour in Status Button to #2c6e49 (Dark Green)
const statusbtnarray = ['vulnerablebutton', 'conservationbutton', 'endangeredbutton', 'critendangeredbutton']; //, 'wildextinctbutton', 'extinctbutton'
function resetStatusBtnColor() {
    for (i = 0; i < statusbtnarray.length; i++) {
        document.getElementById(statusbtnarray[i]).style.backgroundColor = '#2c6e49';
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

//sets all grouping boolean flag to False
function setAllGroupFlagOFF() {
    amphibians = false; //Boolean Flag for Amphibians
    birds = false; //Boolean Flag for Birds
    insects = false; //Boolean Flag for Insects
    mammals = false; //Boolean Flag for Mammals
    reptiles = false; //Boolean Flag for Reptiles
    others = false; //Boolean Flag for Others
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
        //label: 'Animal Group Counts',
        data: [0, 0, 0, 0, 0, 0], //Initial Value
        backgroundColor: [
            'rgba(214, 140, 69 , 0.2)',
            'rgba(214, 140, 69 , 0.2)',
            'rgba(214, 140, 69 , 0.2)',
            'rgba(214, 140, 69 , 0.2)',
            'rgba(214, 140, 69 , 0.2)',
            'rgba(214, 140, 69 , 0.2)'
        ],
        borderColor: [
            'rgba(214, 140, 69, 1)',
            'rgba(214, 140, 69, 1)',
            'rgba(214, 140, 69, 1)',
            'rgba(214, 140, 69, 1)',
            'rgba(214, 140, 69, 1)',
            'rgba(214, 140, 69, 1)'
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
                }//,
                //stepSize: 0.5,
                //barPercentage: 0.5
            }]
            //xAxes: [{
            //    barPercentage: 0.5
            //}]
        },
        events: ['click']
    }
});

//Sample On Click
document.getElementById("groupChart").onclick = function (evt) {
    document.getElementById("speciesgroupTable").style.display = "block"; //show Species Grouping Table
    var activePoints = groupChart.getElementAtEvent(evt);
    var theKey = groupChart.config.data.datakeys[activePoints[0]._index];
    setAllGroupFlagOFF();
    switch (theKey) {
        case "Amphibians":
            amphibians = true;
            $('#groupfilter').html('Amphibians');
            break;
        case "Birds":
            birds = true;
            $('#groupfilter').html('Birds');
            break;
        case "Insects":
            insects = true;
            $('#groupfilter').html('Insects');
            break;
        case "Mammals":
            mammals = true;
            $('#groupfilter').html('Mammals');
            break;
        case "Reptiles":
            reptiles = true;
            $('#groupfilter').html('Reptiles');
            break;
        case "Others":
            others = true;
            $('#groupfilter').html('Others');
            break;
    }
    displayAllTableRow("speciesbygroupings"); //Refresh to show all rows in Table
    dynamicTable();//Dynamically update table display based on State, Status and Group Selected
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


//'statefilter' determines the String State Code
//'statusfilter' determines the String Threatened Status
//'groupfilter' determines the String Group
function groupingTableDisplayFilter(statefilter, statusfilter, groupfilter) {
    // Declare variables
    var statusfilter, statefilter, groupfilter, table, tr, td1, td2, td3, i, statusValue, stateValue, groupValue;
    table = document.getElementById("speciesbygroupings");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[1]; //Status
        td2 = tr[i].getElementsByTagName("td")[2]; //State
        td3 = tr[i].getElementsByTagName("td")[3]; //Grouping
        if (td1) {
            statusValue = td1.textContent.trim() || td1.innerText.trim();
            stateValue = td2.textContent.trim() || td2.innerText.trim();
            groupValue = td3.textContent.trim() || td3.innerText.trim();
            if (stateValue == statefilter && statusValue == statusfilter && groupValue == groupfilter) {
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

//Dynamically update table display based on State, Status and Group Selected
function dynamicTable() {
    //ACT-Amphibians
    if (actstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Amphibians');
    else if (actstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Amphibians');
    else if (actstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Amphibians');
    else if (actstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Amphibians');
    else if (actstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Amphibians');
    else if (actstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Amphibians');
    else if (actstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Amphibians');
    //ACT-Birds
    else if (actstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Birds');
    else if (actstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Birds');
    else if (actstate == true && conservation == true && birds == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Birds');
    else if (actstate == true && endangered == true && birds == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Birds');
    else if (actstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Birds');
    else if (actstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Birds');
    else if (actstate == true && extinct == true && birds == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Birds');
    //ACT-Insects
    else if (actstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Insects');
    else if (actstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Insects');
    else if (actstate == true && conservation == true && insects == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Insects');
    else if (actstate == true && endangered == true && insects == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Insects');
    else if (actstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Insects');
    else if (actstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Insects');
    else if (actstate == true && extinct == true && insects == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Insects');
    //ACT-Mammals
    else if (actstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Mammals');
    else if (actstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Mammals');
    else if (actstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Mammals');
    else if (actstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Mammals');
    else if (actstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Mammals');
    else if (actstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Mammals');
    else if (actstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Mammals');
    //ACT-Reptiles
    else if (actstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Reptiles');
    else if (actstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Reptiles');
    else if (actstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Reptiles');
    else if (actstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Reptiles');
    else if (actstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Reptiles');
    else if (actstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Reptiles');
    else if (actstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Reptiles');
    //ACT-Others
    else if (actstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Others');
    else if (actstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('ACT', 'Vulnerable', 'Others');
    else if (actstate == true && conservation == true && others == true) groupingTableDisplayFilter('ACT', 'Conservation Dependent', 'Others');
    else if (actstate == true && endangered == true && others == true) groupingTableDisplayFilter('ACT', 'Endangered', 'Others');
    else if (actstate == true && critendangered == true && others == true) groupingTableDisplayFilter('ACT', 'Critically Endangered', 'Others');
    else if (actstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('ACT', 'Extinct in the wild', 'Others');
    else if (actstate == true && extinct == true && others == true) groupingTableDisplayFilter('ACT', 'Extinct', 'Others');
    //NSW
    if (nswstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Amphibians');
    else if (nswstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Amphibians');
    else if (nswstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Amphibians');
    else if (nswstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Amphibians');
    else if (nswstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Amphibians');
    else if (nswstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Amphibians');
    else if (nswstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Amphibians');
    //NSW-Birds
    else if (nswstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Birds');
    else if (nswstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Birds');
    else if (nswstate == true && conservation == true && birds == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Birds');
    else if (nswstate == true && endangered == true && birds == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Birds');
    else if (nswstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Birds');
    else if (nswstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Birds');
    else if (nswstate == true && extinct == true && birds == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Birds');
    //NSW-Insects
    else if (nswstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Insects');
    else if (nswstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Insects');
    else if (nswstate == true && conservation == true && insects == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Insects');
    else if (nswstate == true && endangered == true && insects == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Insects');
    else if (nswstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Insects');
    else if (nswstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Insects');
    else if (nswstate == true && extinct == true && insects == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Insects');
    //NSW-Mammals
    else if (nswstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Mammals');
    else if (nswstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Mammals');
    else if (nswstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Mammals');
    else if (nswstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Mammals');
    else if (nswstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Mammals');
    else if (nswstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Mammals');
    else if (nswstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Mammals');
    //NSW-Reptiles
    else if (nswstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Reptiles');
    else if (nswstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Reptiles');
    else if (nswstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Reptiles');
    else if (nswstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Reptiles');
    else if (nswstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Reptiles');
    else if (nswstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Reptiles');
    else if (nswstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Reptiles');
    //NSW-Others
    else if (nswstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Others');
    else if (nswstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('NSW', 'Vulnerable', 'Others');
    else if (nswstate == true && conservation == true && others == true) groupingTableDisplayFilter('NSW', 'Conservation Dependent', 'Others');
    else if (nswstate == true && endangered == true && others == true) groupingTableDisplayFilter('NSW', 'Endangered', 'Others');
    else if (nswstate == true && critendangered == true && others == true) groupingTableDisplayFilter('NSW', 'Critically Endangered', 'Others');
    else if (nswstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('NSW', 'Extinct in the wild', 'Others');
    else if (nswstate == true && extinct == true && others == true) groupingTableDisplayFilter('NSW', 'Extinct', 'Others');
    //VIC
    if (vicstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Amphibians');
    else if (vicstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Amphibians');
    else if (vicstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Amphibians');
    else if (vicstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Amphibians');
    else if (vicstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Amphibians');
    else if (vicstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Amphibians');
    else if (vicstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Amphibians');
    //VIC-Birds
    else if (vicstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Birds');
    else if (vicstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Birds');
    else if (vicstate == true && conservation == true && birds == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Birds');
    else if (vicstate == true && endangered == true && birds == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Birds');
    else if (vicstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Birds');
    else if (vicstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Birds');
    else if (vicstate == true && extinct == true && birds == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Birds');
    //VIC-Insects
    else if (vicstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Insects');
    else if (vicstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Insects');
    else if (vicstate == true && conservation == true && insects == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Insects');
    else if (vicstate == true && endangered == true && insects == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Insects');
    else if (vicstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Insects');
    else if (vicstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Insects');
    else if (vicstate == true && extinct == true && insects == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Insects');
    //VIC-Mammals
    else if (vicstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Mammals');
    else if (vicstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Mammals');
    else if (vicstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Mammals');
    else if (vicstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Mammals');
    else if (vicstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Mammals');
    else if (vicstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Mammals');
    else if (vicstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Mammals');
    //VIC-Reptiles
    else if (vicstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Reptiles');
    else if (vicstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Reptiles');
    else if (vicstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Reptiles');
    else if (vicstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Reptiles');
    else if (vicstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Reptiles');
    else if (vicstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Reptiles');
    else if (vicstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Reptiles');
    //VIC-Others
    else if (vicstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Others');
    else if (vicstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('VIC', 'Vulnerable', 'Others');
    else if (vicstate == true && conservation == true && others == true) groupingTableDisplayFilter('VIC', 'Conservation Dependent', 'Others');
    else if (vicstate == true && endangered == true && others == true) groupingTableDisplayFilter('VIC', 'Endangered', 'Others');
    else if (vicstate == true && critendangered == true && others == true) groupingTableDisplayFilter('VIC', 'Critically Endangered', 'Others');
    else if (vicstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('VIC', 'Extinct in the wild', 'Others');
    else if (vicstate == true && extinct == true && others == true) groupingTableDisplayFilter('VIC', 'Extinct', 'Others');
    //QLD
    if (qldstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Amphibians');
    else if (qldstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Amphibians');
    else if (qldstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Amphibians');
    else if (qldstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Amphibians');
    else if (qldstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Amphibians');
    else if (qldstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Amphibians');
    else if (qldstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Amphibians');
    //QLD-Birds
    else if (qldstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Birds');
    else if (qldstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Birds');
    else if (qldstate == true && conservation == true && birds == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Birds');
    else if (qldstate == true && endangered == true && birds == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Birds');
    else if (qldstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Birds');
    else if (qldstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Birds');
    else if (qldstate == true && extinct == true && birds == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Birds');
    //QLD-Insects
    else if (qldstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Insects');
    else if (qldstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Insects');
    else if (qldstate == true && conservation == true && insects == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Insects');
    else if (qldstate == true && endangered == true && insects == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Insects');
    else if (qldstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Insects');
    else if (qldstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Insects');
    else if (qldstate == true && extinct == true && insects == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Insects');
    //QLD-Mammals
    else if (qldstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Mammals');
    else if (qldstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Mammals');
    else if (qldstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Mammals');
    else if (qldstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Mammals');
    else if (qldstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Mammals');
    else if (qldstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Mammals');
    else if (qldstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Mammals');
    //QLD-Reptiles
    else if (qldstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Reptiles');
    else if (qldstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Reptiles');
    else if (qldstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Reptiles');
    else if (qldstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Reptiles');
    else if (qldstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Reptiles');
    else if (qldstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Reptiles');
    else if (qldstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Reptiles');
    //QLD-Others
    else if (qldstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Others');
    else if (qldstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('QLD', 'Vulnerable', 'Others');
    else if (qldstate == true && conservation == true && others == true) groupingTableDisplayFilter('QLD', 'Conservation Dependent', 'Others');
    else if (qldstate == true && endangered == true && others == true) groupingTableDisplayFilter('QLD', 'Endangered', 'Others');
    else if (qldstate == true && critendangered == true && others == true) groupingTableDisplayFilter('QLD', 'Critically Endangered', 'Others');
    else if (qldstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('QLD', 'Extinct in the wild', 'Others');
    else if (qldstate == true && extinct == true && others == true) groupingTableDisplayFilter('QLD', 'Extinct', 'Others');
    //TAS
    if (tasstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Amphibians');
    else if (tasstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Amphibians');
    else if (tasstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Amphibians');
    else if (tasstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Amphibians');
    else if (tasstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Amphibians');
    else if (tasstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Amphibians');
    else if (tasstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Amphibians');
    //TAS-Birds
    else if (tasstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Birds');
    else if (tasstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Birds');
    else if (tasstate == true && conservation == true && birds == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Birds');
    else if (tasstate == true && endangered == true && birds == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Birds');
    else if (tasstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Birds');
    else if (tasstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Birds');
    else if (tasstate == true && extinct == true && birds == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Birds');
    //TAS-Insects
    else if (tasstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Insects');
    else if (tasstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Insects');
    else if (tasstate == true && conservation == true && insects == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Insects');
    else if (tasstate == true && endangered == true && insects == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Insects');
    else if (tasstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Insects');
    else if (tasstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Insects');
    else if (tasstate == true && extinct == true && insects == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Insects');
    //TAS-Mammals
    else if (tasstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Mammals');
    else if (tasstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Mammals');
    else if (tasstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Mammals');
    else if (tasstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Mammals');
    else if (tasstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Mammals');
    else if (tasstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Mammals');
    else if (tasstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Mammals');
    //TAS-Reptiles
    else if (tasstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Reptiles');
    else if (tasstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Reptiles');
    else if (tasstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Reptiles');
    else if (tasstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Reptiles');
    else if (tasstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Reptiles');
    else if (tasstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Reptiles');
    else if (tasstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Reptiles');
    //TAS-Others
    else if (tasstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Others');
    else if (tasstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('TAS', 'Vulnerable', 'Others');
    else if (tasstate == true && conservation == true && others == true) groupingTableDisplayFilter('TAS', 'Conservation Dependent', 'Others');
    else if (tasstate == true && endangered == true && others == true) groupingTableDisplayFilter('TAS', 'Endangered', 'Others');
    else if (tasstate == true && critendangered == true && others == true) groupingTableDisplayFilter('TAS', 'Critically Endangered', 'Others');
    else if (tasstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('TAS', 'Extinct in the wild', 'Others');
    else if (tasstate == true && extinct == true && others == true) groupingTableDisplayFilter('TAS', 'Extinct', 'Others');
    //NT
    if (ntstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Amphibians');
    else if (ntstate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Amphibians');
    else if (ntstate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Amphibians');
    else if (ntstate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('NT', 'Endangered', 'Amphibians');
    else if (ntstate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Amphibians');
    else if (ntstate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Amphibians');
    else if (ntstate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('NT', 'Extinct', 'Amphibians');
    //NT-Birds
    else if (ntstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Birds');
    else if (ntstate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Birds');
    else if (ntstate == true && conservation == true && birds == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Birds');
    else if (ntstate == true && endangered == true && birds == true) groupingTableDisplayFilter('NT', 'Endangered', 'Birds');
    else if (ntstate == true && critendangered == true && birds == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Birds');
    else if (ntstate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Birds');
    else if (ntstate == true && extinct == true && birds == true) groupingTableDisplayFilter('NT', 'Extinct', 'Birds');
    //NT-Insects
    else if (ntstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Insects');
    else if (ntstate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Insects');
    else if (ntstate == true && conservation == true && insects == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Insects');
    else if (ntstate == true && endangered == true && insects == true) groupingTableDisplayFilter('NT', 'Endangered', 'Insects');
    else if (ntstate == true && critendangered == true && insects == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Insects');
    else if (ntstate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Insects');
    else if (ntstate == true && extinct == true && insects == true) groupingTableDisplayFilter('NT', 'Extinct', 'Insects');
    //NT-Mammals
    else if (ntstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Mammals');
    else if (ntstate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Mammals');
    else if (ntstate == true && conservation == true && mammals == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Mammals');
    else if (ntstate == true && endangered == true && mammals == true) groupingTableDisplayFilter('NT', 'Endangered', 'Mammals');
    else if (ntstate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Mammals');
    else if (ntstate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Mammals');
    else if (ntstate == true && extinct == true && mammals == true) groupingTableDisplayFilter('NT', 'Extinct', 'Mammals');
    //NT-Reptiles
    else if (ntstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Reptiles');
    else if (ntstate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Reptiles');
    else if (ntstate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Reptiles');
    else if (ntstate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('NT', 'Endangered', 'Reptiles');
    else if (ntstate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Reptiles');
    else if (ntstate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Reptiles');
    else if (ntstate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('NT', 'Extinct', 'Reptiles');
    //NT-Others
    else if (ntstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Others');
    else if (ntstate == true && vulnerable == true && others == true) groupingTableDisplayFilter('NT', 'Vulnerable', 'Others');
    else if (ntstate == true && conservation == true && others == true) groupingTableDisplayFilter('NT', 'Conservation Dependent', 'Others');
    else if (ntstate == true && endangered == true && others == true) groupingTableDisplayFilter('NT', 'Endangered', 'Others');
    else if (ntstate == true && critendangered == true && others == true) groupingTableDisplayFilter('NT', 'Critically Endangered', 'Others');
    else if (ntstate == true && wildextinct == true && others == true) groupingTableDisplayFilter('NT', 'Extinct in the wild', 'Others');
    else if (ntstate == true && extinct == true && others == true) groupingTableDisplayFilter('NT', 'Extinct', 'Others');
    //WA
    if (wastate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Amphibians');
    else if (wastate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Amphibians');
    else if (wastate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Amphibians');
    else if (wastate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('WA', 'Endangered', 'Amphibians');
    else if (wastate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Amphibians');
    else if (wastate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Amphibians');
    else if (wastate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('WA', 'Extinct', 'Amphibians');
    //WA-Birds
    else if (wastate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Birds');
    else if (wastate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Birds');
    else if (wastate == true && conservation == true && birds == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Birds');
    else if (wastate == true && endangered == true && birds == true) groupingTableDisplayFilter('WA', 'Endangered', 'Birds');
    else if (wastate == true && critendangered == true && birds == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Birds');
    else if (wastate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Birds');
    else if (wastate == true && extinct == true && birds == true) groupingTableDisplayFilter('WA', 'Extinct', 'Birds');
    //WA-Insects
    else if (wastate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Insects');
    else if (wastate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Insects');
    else if (wastate == true && conservation == true && insects == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Insects');
    else if (wastate == true && endangered == true && insects == true) groupingTableDisplayFilter('WA', 'Endangered', 'Insects');
    else if (wastate == true && critendangered == true && insects == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Insects');
    else if (wastate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Insects');
    else if (wastate == true && extinct == true && insects == true) groupingTableDisplayFilter('WA', 'Extinct', 'Insects');
    //WA-Mammals
    else if (wastate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Mammals');
    else if (wastate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Mammals');
    else if (wastate == true && conservation == true && mammals == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Mammals');
    else if (wastate == true && endangered == true && mammals == true) groupingTableDisplayFilter('WA', 'Endangered', 'Mammals');
    else if (wastate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Mammals');
    else if (wastate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Mammals');
    else if (wastate == true && extinct == true && mammals == true) groupingTableDisplayFilter('WA', 'Extinct', 'Mammals');
    //WA-Reptiles
    else if (wastate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Reptiles');
    else if (wastate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Reptiles');
    else if (wastate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Reptiles');
    else if (wastate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('WA', 'Endangered', 'Reptiles');
    else if (wastate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Reptiles');
    else if (wastate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Reptiles');
    else if (wastate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('WA', 'Extinct', 'Reptiles');
    //WA-Others
    else if (wastate == true && vulnerable == true && others == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Others');
    else if (wastate == true && vulnerable == true && others == true) groupingTableDisplayFilter('WA', 'Vulnerable', 'Others');
    else if (wastate == true && conservation == true && others == true) groupingTableDisplayFilter('WA', 'Conservation Dependent', 'Others');
    else if (wastate == true && endangered == true && others == true) groupingTableDisplayFilter('WA', 'Endangered', 'Others');
    else if (wastate == true && critendangered == true && others == true) groupingTableDisplayFilter('WA', 'Critically Endangered', 'Others');
    else if (wastate == true && wildextinct == true && others == true) groupingTableDisplayFilter('WA', 'Extinct in the wild', 'Others');
    else if (wastate == true && extinct == true && others == true) groupingTableDisplayFilter('WA', 'Extinct', 'Others');
    //SA
    if (sastate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Amphibians');
    else if (sastate == true && vulnerable == true && amphibians == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Amphibians');
    else if (sastate == true && conservation == true && amphibians == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Amphibians');
    else if (sastate == true && endangered == true && amphibians == true) groupingTableDisplayFilter('SA', 'Endangered', 'Amphibians');
    else if (sastate == true && critendangered == true && amphibians == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Amphibians');
    else if (sastate == true && wildextinct == true && amphibians == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Amphibians');
    else if (sastate == true && extinct == true && amphibians == true) groupingTableDisplayFilter('SA', 'Extinct', 'Amphibians');
    //SA-Birds
    else if (sastate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Birds');
    else if (sastate == true && vulnerable == true && birds == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Birds');
    else if (sastate == true && conservation == true && birds == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Birds');
    else if (sastate == true && endangered == true && birds == true) groupingTableDisplayFilter('SA', 'Endangered', 'Birds');
    else if (sastate == true && critendangered == true && birds == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Birds');
    else if (sastate == true && wildextinct == true && birds == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Birds');
    else if (sastate == true && extinct == true && birds == true) groupingTableDisplayFilter('SA', 'Extinct', 'Birds');
    //SA-Insects
    else if (sastate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Insects');
    else if (sastate == true && vulnerable == true && insects == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Insects');
    else if (sastate == true && conservation == true && insects == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Insects');
    else if (sastate == true && endangered == true && insects == true) groupingTableDisplayFilter('SA', 'Endangered', 'Insects');
    else if (sastate == true && critendangered == true && insects == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Insects');
    else if (sastate == true && wildextinct == true && insects == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Insects');
    else if (sastate == true && extinct == true && insects == true) groupingTableDisplayFilter('SA', 'Extinct', 'Insects');
    //SA-Mammals
    else if (sastate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Mammals');
    else if (sastate == true && vulnerable == true && mammals == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Mammals');
    else if (sastate == true && conservation == true && mammals == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Mammals');
    else if (sastate == true && endangered == true && mammals == true) groupingTableDisplayFilter('SA', 'Endangered', 'Mammals');
    else if (sastate == true && critendangered == true && mammals == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Mammals');
    else if (sastate == true && wildextinct == true && mammals == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Mammals');
    else if (sastate == true && extinct == true && mammals == true) groupingTableDisplayFilter('SA', 'Extinct', 'Mammals');
    //SA-Reptiles
    else if (sastate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Reptiles');
    else if (sastate == true && vulnerable == true && reptiles == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Reptiles');
    else if (sastate == true && conservation == true && reptiles == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Reptiles');
    else if (sastate == true && endangered == true && reptiles == true) groupingTableDisplayFilter('SA', 'Endangered', 'Reptiles');
    else if (sastate == true && critendangered == true && reptiles == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Reptiles');
    else if (sastate == true && wildextinct == true && reptiles == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Reptiles');
    else if (sastate == true && extinct == true && reptiles == true) groupingTableDisplayFilter('SA', 'Extinct', 'Reptiles');
    //SA-Others
    else if (sastate == true && vulnerable == true && others == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Others');
    else if (sastate == true && vulnerable == true && others == true) groupingTableDisplayFilter('SA', 'Vulnerable', 'Others');
    else if (sastate == true && conservation == true && others == true) groupingTableDisplayFilter('SA', 'Conservation Dependent', 'Others');
    else if (sastate == true && endangered == true && others == true) groupingTableDisplayFilter('SA', 'Endangered', 'Others');
    else if (sastate == true && critendangered == true && others == true) groupingTableDisplayFilter('SA', 'Critically Endangered', 'Others');
    else if (sastate == true && wildextinct == true && others == true) groupingTableDisplayFilter('SA', 'Extinct in the wild', 'Others');
    else if (sastate == true && extinct == true && others == true) groupingTableDisplayFilter('SA', 'Extinct', 'Others');
}


// Change the cursor to a pointer when the mouse is over the state layer.
map.on('mouseenter', 'ACT', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'NSW', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'VIC', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'QLD', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'TAS', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'SA', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'NT', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'WA', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'ACT', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'NSW', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'VIC', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'QLD', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'TAS', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'SA', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'WA', function () {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'NT', function () {
    map.getCanvas().style.cursor = '';
});