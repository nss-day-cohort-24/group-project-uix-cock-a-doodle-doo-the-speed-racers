"use strict";
let $ = require('jquery');

var set = document.getElementById("set");
set.addEventListener("click", printZip);


function printZip(){
  var zipCode = document.getElementById("setZip");
  var code = document.getElementById("zip").value;

  zipCode.innerHTML = code;

  if ($('#setZip').is(':empty')) {
    console.log("empty");
  } else {
      weather(code).then((resolve) => {
        weatherPrint(resolve);
      });
  }
}

// call weather data

function weather(code){

  return new Promise((resolve,reject) => {
    var info = `https://api.openweathermap.org/data/2.5/weather?zip=${code},us&appid=6b19bec2b5b47af4fb4a80fdc0a1ef6c`;
    console.log(info);
    var weatherData = new XMLHttpRequest();
    
    weatherData.addEventListener('load', function(){
      var weather = JSON.parse(this.responseText);
      resolve(weather);
    });
    weatherData.addEventListener('error', function(){
      reject();
    });
    weatherData.open("GET", info);
    weatherData.send();
  });
  }

  function weatherPrint(weather){
    console.log(weather);
    var kel = weather.main.temp;
    var degrees = kel*9/5 - 459.67;
    var fahrenheit = Math.round(degrees);
    console.log(Math.round(degrees));
    console.log(`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    var wImage = document.getElementById("weatherImage");
    wImage.innerHTML = `<div id="temp">${fahrenheit}°F</div><img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="weather image">`;
    var location = document.getElementById("setLocation");
    location.innerHTML = `<div id="currentLocation">${weather.name}</div>`;
  }

    module.exports = {printZip};

