//let map = L.map('mapid').setView([30, 30], 10);

//we dont use setView and we use alternetive methode instead

//bc we have a large data set we put tileLayer first to make sure while data is loading we have a map

//we create the street view tile layer that will be the default background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
  });
//we create the dark view tile layer that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//now we need to crate a base map
let baseMaps={
    "Streets":streets,
    "Satellite Streets":satelliteStreets
};
//instesd of set view we used alternetive method and we set the default layer for our map
let map=L.map("mapid",{
    center:[43.7,-79.3],
    zoom:11,
    layers:[satelliteStreets]
})
//pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);
let torontoHoods="https://raw.githubusercontent.com/elhamamini/Mapping_Earthquakes/main/torontoNeighborhoods.json"

d3.json(torontoHoods).then((data)=>{
    console.log("data",data);
    L.geoJson(data,{
        color:"yellow",
        weight:1,
        onEachfeature:function(feature,layer){
        layer.bindPopup("<h3> Airline: "+feature.properties.airline+"</h3> <hr><h3> Destination: "+feature.properties.dst+"</h3>");
        }
    }).addTo(map);
})

   



  //the rest of this part is for adding one point 
  //Add GeoJSON data
//   let sanFranAirport ={"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     // pointToLayer: function(feature, latlng) {
//     //   console.log(feature);
//     //   return L.marker(latlng).bindPopup("<h2>"+feature.properties.city+"</h2>");
//     // }

//     onEachFeature:function(feature,layer){
//         console.log(layer); 
//         layer.bindPopup();
//     }

//   }).addTo(map);

// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   accessToken: API_KEY
//   });
//   // Then we add our 'graymap' tile layer to the map.
 //  streets.addTo(map);