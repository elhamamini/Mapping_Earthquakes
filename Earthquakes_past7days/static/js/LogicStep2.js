

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
    "Satellite":satelliteStreets
};
//instesd of set view we used alternetive method and we set the default layer for our map
let map=L.map("mapid",{
    center:[39.5,-98.5],
    zoom:3,
    layers:[streets]
})
//pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data)=>{
    console.log("data",data);
    //we turn each feature into a circle marker 
    L.geoJson(data,{
        pointToLayer:function(feature,latlng){
            return L.circleMarker(latlng)
        },
        //we set the style for each circleMarker using our styleInfo function
        style:styleInfo
    }).addTo(map);
     //getRadius function will retrieves the earthquake magnitude
    function styleInfo(feature){
        return {
            opacity:1,
            fillOpacity:1,
            fillColor:"#ffae42",
            color:"#000000",
            radius:getRadius(feature.properties.mag),
            stroke:true,
            weight:0.5
        }
    }
})

function getRadius(magnitude){
    if(magnitude === 0){
        return 1;
    }
    return magnitude*4;
}
   


