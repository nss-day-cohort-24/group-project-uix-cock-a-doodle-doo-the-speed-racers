"use strict";
let $ = require('jquery'),
    login = require("./user"),
    firebase = require("./fb-config"),
    theID;

var change = document.getElementById("change");
var set = document.getElementById("set");
set.addEventListener("click", printZip);
change.addEventListener("click", changeZip);


function printZip(){
  var zipCode = document.getElementById("setZip");
  var code = document.getElementById("zip").value;
  $(set).hide();
  $(change).show();
  

  zipCode.innerHTML = code;

  if ($('#setZip').is(':empty')) {
    console.log("empty");
  } else {
      weather(code).then((resolve) => {
        weatherPrint(resolve);
      });
  }
}

function changeZip(){
  var zipCode = document.getElementById("setZip");
  var code = document.getElementById("zip").value;

  zipCode.innerHTML = code;

  if ($('#setZip').is(':empty')) {
    console.log("empty");
  } else {
      weather(code).then((resolve) => {
        weatherPrintEdit(resolve);
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
    saveWeather(weather);
  }
  function weatherPrintEdit(weather){
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
    editWeather(weather);
  }

////////////////////////////////
/// SECTION 1 SAVING WEATHER ///
////////////////////////////////

//start line
function saveWeather(weatherData){
  let weatherObj = buildWeatherObj(weatherData);
  addWeather(weatherObj).then((resolve) => {
    saveWeatherID();
  });
}

//data builder
function buildWeatherObj(data){
  var code = document.getElementById("zip").value;
  let weatherObj = {
    lat: data.coord.lon,
    lon: data.coord.lat,
    zipCode: code,
    uid: login.getUser()
  };
  return weatherObj;
}

//data poster
function addWeather(weatherInput){
  return $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/locations.json`,
      type: 'POST',
      data: JSON.stringify(weatherInput),
      dataType: 'json'
  }).done((bookID) => {
      return bookID;
  });
}

//saves ID
function saveWeatherID(){
  let currentUser = login.getUser();
  getID(currentUser).then((resolve) => {
    loop(resolve);
  });
}

//calls for data of ID
let getID = (input) => {
  return new Promise ((resolve, reject) => {
      var ID = `${firebase.getFBsettings().databaseURL}/locations.json?orderBy="uid"&equalTo="${input}"`;
      
      let request = new XMLHttpRequest();

      request.onload = function() {
          if (request.status === 200) {
              let data = JSON.parse(request.responseText);
              resolve(data);
          }
      };
      request.open("GET", ID);
      request.send();
  });
};

function loop(resolve){
  for (let item in resolve) {
    theID = item;
  }
}

/////////////////////////////////
/// SECTION 2 EDITING WEATHER ///
/////////////////////////////////

// start line
function editWeather(weatherData){
  let weatherObj = buildWeatherObj(weatherData);
  console.log("THE WEATHER", weatherObj);
  // console.log("THE ID", theID);
  editData(weatherObj, theID).then((resolve) => {
    console.log("DONE!");
  });
}

//data editer
function editData(data, user){
  return $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/locations/${user}.json`,
      type: 'PUT',
      data: JSON.stringify(data),
      dataType: 'json'
  }).done((weatherID) => {
      return weatherID;
  });
}
    module.exports = {printZip};

