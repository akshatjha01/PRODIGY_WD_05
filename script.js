const apiKey = "3920f6ef8901ccbb302df798d0329340";

let chart;

async function getWeather() {

const city=document.getElementById("city").value.trim();

if(city===""){

alert("Please enter city name");

return;

}

try{

const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

const data=await response.json();

if(data.cod!=200){

alert("City Not Found");

return;

}

displayCurrentWeather(data);

changeBackground(data.weather[0].main,data.wind.speed);

loadForecast(city);

}catch(error){

alert("Something went wrong");

}

}

function displayCurrentWeather(data){

document.getElementById("temperature").innerHTML=`${Math.round(data.main.temp)}°C`;

document.getElementById("condition").innerHTML=data.weather[0].description;

document.getElementById("humidity").innerHTML=`💧 Humidity : ${data.main.humidity}%`;

document.getElementById("humidity2").innerHTML=`${data.main.humidity}%`;

document.getElementById("wind").innerHTML=`💨 Wind : ${data.wind.speed} m/s`;

document.getElementById("wind2").innerHTML=`${data.wind.speed} m/s`;

document.getElementById("pressure").innerHTML=`${data.main.pressure} hPa`;

document.getElementById("visibility").innerHTML=`👀 Visibility : ${(data.visibility/1000).toFixed(1)} km`;

document.getElementById("visibility2").innerHTML=`${(data.visibility/1000).toFixed(1)} km`;

document.getElementById("feelsLike").innerHTML=`${Math.round(data.main.feels_like)}°C`;

const sunrise=new Date(data.sys.sunrise*1000);

const sunset=new Date(data.sys.sunset*1000);

document.getElementById("sunrise").innerHTML=`🌅 Sunrise : ${sunrise.toLocaleTimeString()}`;

document.getElementById("sunset").innerHTML=`🌇 Sunset : ${sunset.toLocaleTimeString()}`;

document.getElementById("weatherIcon").innerHTML=`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;

}
async function loadForecast(city){

try{

const response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

const data=await response.json();

displayTomorrow(data);

displayForecast(data);

}

catch(error){

console.log(error);

}

}

function displayTomorrow(data){

const tomorrow=data.list[7];

document.getElementById("tomorrowWeather").innerHTML=`

<div class="forecast-box">

<h3>Tomorrow</h3>

<img src="https://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png">

<p>${Math.round(tomorrow.main.temp)}°C</p>

<p>${tomorrow.weather[0].main}</p>

</div>

`;

}

function displayForecast(data){

const forecast=document.getElementById("forecastCards");

forecast.innerHTML="";

const days=[];

data.list.forEach(item=>{

const date=new Date(item.dt*1000);

const day=date.toLocaleDateString("en-US",{weekday:"short"});

if(!days.includes(day) && days.length<5){

days.push(day);

forecast.innerHTML+=`

<div class="forecast-box">

<h3>${day}</h3>

<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

<p>${Math.round(item.main.temp)}°C</p>

<p>${item.weather[0].main}</p>

</div>

`;

}

});

drawChart(data);

}
function drawChart(data){

const labels=[];
const temps=[];

data.list.forEach(item=>{

const date=new Date(item.dt*1000);

labels.push(
date.toLocaleDateString("en-US",{weekday:"short"})+" "+
date.getHours()+":00"
);

temps.push(item.main.temp);

});

const ctx=document.getElementById("weatherChart").getContext("2d");

if(chart){

chart.destroy();

}

chart=new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Temperature °C",

data:temps,

fill:false,

borderColor:"#ff9800",

backgroundColor:"#ff9800",

tension:.4,

pointRadius:3

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

},

scales:{

y:{

beginAtZero:false

}

}

}

});

}

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(loadLocationWeather);

}else{

alert("Geolocation not supported");

}

}

async function loadLocationWeather(position){

const lat=position.coords.latitude;

const lon=position.coords.longitude;

try{

const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

const data=await response.json();

displayCurrentWeather(data);

changeBackground(data.weather[0].main,data.wind.speed);

document.getElementById("city").value=data.name;

loadForecast(data.name);

}catch(error){

alert("Location weather failed");

}

}

function changeBackground(weather,wind){

const body=document.body;

body.className="";

if(wind>=12){

body.classList.add("storm");

return;

}

switch(weather){

case"Clear":

body.classList.add("sunny");

break;

case"Clouds":

body.classList.add("cloudy");

break;

case"Rain":

case"Drizzle":

body.classList.add("rain");

break;

case"Thunderstorm":

body.classList.add("storm");

break;

case"Snow":

body.classList.add("snow");

break;

case"Mist":

case"Fog":

case"Haze":

body.classList.add("fog");

break;

default:

body.classList.add("default");

}

}
async function loadAQI(lat,lon){

try{

const response=await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);

const data=await response.json();

const aqi=data.list[0].main.aqi;

let text="";

switch(aqi){

case 1:

text="🟢 Good";

break;

case 2:

text="🟡 Fair";

break;

case 3:

text="🟠 Moderate";

break;

case 4:

text="🔴 Poor";

break;

case 5:

text="🟣 Very Poor";

break;

default:

text="N/A";

}

document.getElementById("aqi").innerHTML=text;

}catch(error){

document.getElementById("aqi").innerHTML="N/A";

}

}

function createCloud(){

const cloud=document.createElement("div");

cloud.className="cloud";

cloud.style.top=Math.random()*250+"px";

cloud.style.animationDuration=(25+Math.random()*20)+"s";

document.body.appendChild(cloud);

setTimeout(()=>{

cloud.remove();

},45000);

}

setInterval(createCloud,7000);

function createRain(){

const rain=document.createElement("div");

rain.className="rain";

rain.style.left=Math.random()*100+"vw";

rain.style.animationDuration=(0.5+Math.random())+"s";

document.body.appendChild(rain);

setTimeout(()=>{

rain.remove();

},1500);

}

setInterval(()=>{

if(document.body.classList.contains("rain")||

document.body.classList.contains("storm")){

for(let i=0;i<25;i++){

createRain();

}

}

},300);

async function loadWeatherByLocation(lat,lon){

try{

const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

const data=await response.json();

displayCurrentWeather(data);

changeBackground(data.weather[0].main,data.wind.speed);

loadForecast(data.name);

loadAQI(lat,lon);

document.getElementById("city").value=data.name;

}catch(error){

alert("Unable to fetch location weather.");

}

}