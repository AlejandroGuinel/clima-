$(document).ready(function(){

$("#searchBtn").click(function(){
getWeather();
});

$("#cityInput").keypress(function(e){
if(e.which == 13){
getWeather();
}
});

function getWeather(){

let city = $("#cityInput").val();

if(city === ""){
alert("Escribe una ciudad");
return;
}

$("#weatherResult").html("");
$("#loader").removeClass("d-none");

let apiKey = "5b8918e9452fe6576bbd77dc4fd3978a";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

$.ajax({
url: url,
method: "GET",
success: function(data){

$("#loader").addClass("d-none");

let temp = Math.round(data.main.temp);
let feels = Math.round(data.main.feels_like);
let humidity = data.main.humidity;
let pressure = data.main.pressure;
let wind = data.wind.speed;
let description = data.weather[0].description;
let icon = data.weather[0].icon;
let lat = data.coord.lat;
let lon = data.coord.lon;

let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
let now = new Date().toLocaleString();

changeBackground(temp);

let html = `
<div class="weather-main">
<div>
<h3>${data.name}</h3>
<p>${now}</p>
<p class="text-capitalize">${description}</p>
<div class="weather-temp">${temp}°C</div>
<small>Sensación térmica: ${feels}°C</small>
</div>
<img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
</div>

<div class="row weather-details mt-4">
<div class="col-md-4">
<div class="detail-box">
💧 Humedad
<h5>${humidity}%</h5>
</div>
</div>
<div class="col-md-4">
<div class="detail-box">
🌬 Viento
<h5>${wind} m/s</h5>
</div>
</div>
<div class="col-md-4">
<div class="detail-box">
🧭 Presión
<h5>${pressure} hPa</h5>
</div>
</div>
<div class="col-md-6">
<div class="detail-box">
🌅 Amanecer
<h5>${sunrise}</h5>
</div>
</div>
<div class="col-md-6">
<div class="detail-box">
🌇 Atardecer
<h5>${sunset}</h5>
</div>
</div>
<div class="col-12">
<div class="detail-box">
📍 Coordenadas
<h5>${lat}, ${lon}</h5>
</div>
</div>
</div>
`;

$("#weatherResult").html(html);
},
error: function(){
$("#loader").addClass("d-none");
$("#weatherResult").html(`
<div class="alert alert-danger">
Ciudad no encontrada 😢
</div>
`);
}
});
}

function changeBackground(temp){
if(temp <= 10){
$("body").css("background","linear-gradient(135deg, #00c6ff, #0072ff)");
}
else if(temp <= 25){
$("body").css("background","linear-gradient(135deg, #4e73df, #1cc88a)");
}
else{
$("body").css("background","linear-gradient(135deg, #ff512f, #dd2476)");
}
}

});