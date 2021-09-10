let map = L.map('mapid').setView([37.5, -122.5], 10);


  //we want to add single point on our map using GeoJSON

  //Add GeoJSON data
  let sanFranAirport ={"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    // pointToLayer: function(feature, latlng) {
    //   console.log(feature);
    //   return L.marker(latlng).bindPopup("<h2>"+feature.properties.city+"</h2>");
    // }

    onEachFeature:function(feature,layer){
        console.log(layer); 
        layer.bindPopup();
    }

  }).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
  });
  // Then we add our 'graymap' tile layer to the map.
  streets.addTo(map);