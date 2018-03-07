"use strict";

// console.log("Hello main.js");
let meetupAPI = require('./meetup-api.js');
let news = require('./news_api');
let printMeetup = require('./dom-builder');
require("../js/weather.js");
let news_api = require('./news_api');
let newsToDom = require('./dom-builder');
let books = require('./books_api');

// news.api_calls.getHeadlines();
news.api_calls.giveHeadlines();

"use strict";
console.log("javascripts.js");


///function to call the meetup APIs
function callMeetupApi(url) {
    console.log("callMeetupApi");
    return $.ajax({
    url: url,
    dataType: "json",
    });
    }

    callMeetupApi("https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=technology&page=10&sig_id=194426544&lon=-86.7816&lat=36.1627&sig=fc94244c44f01706117c5e4edfc04d3b9279afdd&key=4d1a4e4c161d807435128114c225176")
    .then((meetupArray) => {
        console.log("meetupArray", meetupArray);
        //meetupToRenderToDom
        let meetupList = [];
        console.log("meetupList", meetupList);
        let eventsArray = meetupArray.events;
        console.log("eventsArray", eventsArray);
        meetupToRenderToDom(meetupArray);
    },
    (reject) => {
    console.log("SOMETHING WENT REALLY WRONG");
    });

         
// books api calls


news_api.getHeadlines()
  .then((resolve) => {
    newsToDom.taco(resolve);
});


