/**
* This is a JavaScript to call MapBox API to load the maps of Species Australia db.
* I have set the default configuration to enable the geocoder and the navigation control.
* https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
*
* @author Adhi Baskoro <abas0012@student.monash.edu>
* Date: 22/04/2020
*/
const TOKEN = "pk.eyJ1IjoiYWJhczAwMTIiLCJhIjoiY2s4cDBvejUxMDJjaTNtcXViemgxYTI1dCJ9.wRCYToYunc4isymyq4Gy_Q";
//MAP SOURCE CODES
mapboxgl.accessToken = TOKEN;
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
            'fill-color': 'rgba(200, 100, 240, 0.4)', //Violet
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing AUSTRALIAN CAPITAL TERRITORY state polygons.
    map.addLayer({
        'id': 'ACT',
        'type': 'fill',
        'source': 'act',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing SOUTH AUSTRALIA state polygons.
    map.addLayer({
        'id': 'SA',
        'type': 'fill',
        'source': 'sa',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing VICTORIA state polygons.
    map.addLayer({
        'id': 'VIC',
        'type': 'fill',
        'source': 'vic',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing TASMANIA state polygons.
    map.addLayer({
        'id': 'TAS',
        'type': 'fill',
        'source': 'tas',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing QUEENSLAND state polygons.
    map.addLayer({
        'id': 'QLD',
        'type': 'fill',
        'source': 'qld',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });
    // Add a layer showing WESTERN AUSTRALIA state polygons.
    map.addLayer({
        'id': 'WA',
        'type': 'fill',
        'source': 'wa',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
    });

    // Add a layer showing NORTHEN TERRITORY state polygons.
    map.addLayer({
        'id': 'NT',
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
    map.on('click', 'NSW', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the AUSTRALIAN CAPITAL TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'ACT', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the SOUTH AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'SA', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the VICTORIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'VIC', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the TASMANIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'TAS', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the QUEENSLAND layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'QLD', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the WESTERN AUSTRALIA layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'WA', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });
    // When a click event occurs on a feature in the NORTHEN TERRITORY layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'NT', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.state_pid)
            .addTo(map);
    });

    //BUTTONS INTERACTIONS
    document.getElementById("vulnerablebutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(vulnerablearray);
        setLegendCountValues(vulnerablearray);
    });
    document.getElementById("wildextinctbutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(extinctinwildarray);
        setLegendCountValues(extinctinwildarray);
    });
    document.getElementById("endangeredbutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(endangeredarray);
        setLegendCountValues(endangeredarray);
    });
    document.getElementById("critendangeredbutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(critendangeredarray);
        setLegendCountValues(critendangeredarray);
    });
    document.getElementById("conservationbutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(conservationarray);
        setLegendCountValues(conservationarray);
    });
    document.getElementById("extinctbutton").addEventListener("click", function () {
        resetStateFilter();
        resetRankingValue();
        displayStateFilter(extinctarray);
        setLegendCountValues(extinctarray);
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


//Function to set the the Legend Values for Vulnerable Status
function setLegendCountValues(temparray) {
    for (i = 0; i < temparray.length; i++) {
        switch (i) {
            case 0:
                document.getElementById("rank1").innerHTML = temparray[i].totalcount;
                break;
            case 1:
                document.getElementById("rank2").innerHTML = temparray[i].totalcount;
                break;
            case 2:
                document.getElementById("rank3").innerHTML = temparray[i].totalcount;
                break;
            case 3:
                document.getElementById("rank4").innerHTML = temparray[i].totalcount;
                break;
            case 4:
                document.getElementById("rank5").innerHTML = temparray[i].totalcount;
                break;
            case 5:
                document.getElementById("rank6").innerHTML = temparray[i].totalcount;
                break;
            case 6:
                document.getElementById("rank7").innerHTML = temparray[i].totalcount;
                break;
            case 7:
                document.getElementById("rank8").innerHTML = temparray[i].totalcount;
                break;
        }
    }
}

//Function to change Filter of States by Vulnerable Status in Ranking Order
function displayStateFilter(temparray) {
    console.log(temparray);
    for (i = 0; i < temparray.length; i++) {
        console.log(temparray[i]);
        switch (i) {
            case 0: //RANK 1
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(120, 25, 25, 0.4)'); //Dark Maroon
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(120, 25, 25, 1)'); //Dark Maroon
                break;
            case 1: //RANK 2
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(222, 48, 13, 0.4)'); //Red
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(222, 48, 13, 1)'); //Red
                break;
            case 2: //RANK 3
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(120, 77, 25, 0.4)'); //Brown
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(120, 77, 25, 1)'); //Brown
                break;
            case 3: //RANK 4
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(237, 102, 12,0.4)'); //Orange
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(237, 102, 12,1)'); //Orange
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
                    'rgba(120, 148, 31, 0.4)'); //Olive Green
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(120, 148, 31, 1)'); //Olive Green
                break;
            case 7: //RANK 8
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-color',
                    'rgba(100, 224, 22, 0.4)'); //Light Green
                map.setPaintProperty(
                    temparray[i].state,
                    'fill-outline-color',
                    'rgba(100, 224, 22, 1)'); //Light Green
                break;
        }
    }
}

//Function to Reset State Fill Colour to 'Default'
const statecodearray = ['ACT','VIC','NSW','SA','WA','QLD','TAS','NT'];
function resetStateFilter() {
    for (i = 0; i < statecodearray.length; i++) {
        map.setPaintProperty(
            statecodearray[i],
            'fill-color',
            'rgba(200, 100, 240, 0.4)'); //Violet
        map.setPaintProperty(
            statecodearray[i],
            'fill-outline-color',
            'rgba(200, 100, 240, 1)'); //Violet
    }
}

//Function to Reset Rank Count value to 0
const rankcountarray = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8'];
function resetRankingValue() {
    for (i = 0; i < rankcountarray.length; i++) {
        document.getElementById(rankcountarray[i]).innerHTML = 0;
    }
}

//MAP CONTROLS
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


