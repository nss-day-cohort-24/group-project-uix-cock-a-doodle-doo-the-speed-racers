"use strict";
let $ = require('jquery');

var set = document.getElementById("set");
set.addEventListener("click", printZip);

function printZip(){
  var zipCode = document.getElementById("setZip");
  var code = document.getElementById("zip").value;

  zipCode.innerHTML = code;
}

var zipCode = document.getElementById("setZip");
if ( $('#setZip').text().length > 0 ) {
	console.log("hi");
}

// call weather data

function weather(){

  return new Promise((resolve,reject) => {
    var info = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=6b19bec2b5b47af4fb4a80fdc0a1ef6c`;
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

  weatherPrint();

  function weatherPrint(){
    // listRestaurants.innerHTML = ``;
    weather()
      .then(

        function(weather) {
            console.log(weather);
            console.log(weather.main.temp);

          });

    }

    module.exports = {weatherPrint};

