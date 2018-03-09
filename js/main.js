"use strict";

console.log("Hello main.js");
let $ = require('jquery');
let meetupAPI = require('./meetup-api.js');
let printMeetup = require('./dom-builder');
let news_api = require('./news_api');
let newsToDom = require('./dom-builder');
require("../js/weather.js");
let books = require('./books_api');
let login = require("./user");

news_api.getHeadlines()
  .then((resolve) => {
    var aRay10 = newsToDom.chopData(resolve);
    newsToDom.publishNews(aRay10);
});
meetupAPI.callMeetupApi("https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=technology&page=10&sig_id=194426544&lon=-86.7816&lat=36.1627&sig=fc94244c44f01706117c5e4edfc04d3b9279afdd&key=4d1a4e4c161d807435128114c225176")
    .then((resolve) => {
        console.log("meetupArray", resolve);
        printMeetup.meetupToRenderToDom(resolve);
    },
    (reject) => {
    console.log("SOMETHING WENT REALLY WRONG");
    });


$("#auth-btn").click(function(){
  console.log("clicked on Signin");
  
  login.logInGoogle()
  .then((result) => {
    console.log("result from login", result.user.uid);
    $("#auth-btn").hide();
    $("#logout").show();
    login.setUser(result.user.uid);

  });
});

$("#logout").click(function(){
  console.log("logout clicked");
  $("#logout").hide();
  $("#auth-btn").show();
  login.logOut();

});
