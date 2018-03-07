"use strict";
let $ = require('jquery');
let printMeetup = require('./dom-builder');

//function to call the meetup APIs
function callMeetupApi(url) {
    console.log("callMeetupApi");
    return $.ajax({
    url: url,
    dataType: "json",
    });
    }

    callMeetupApi("https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=technology&page=10&sig_id=194426544&lon=-86.7816&lat=36.1627&sig=fc94244c44f01706117c5e4edfc04d3b9279afdd&key=4d1a4e4c161d807435128114c225176")
    .then((meetupData) => {
        console.log("meetupData", meetupData);
        //meetupToRenderToDom
        let meetupList = [];
        // console.log("meetupList", meetupList);
         let eventsArray = meetupData.events;
        console.log("eventsArray", eventsArray);
        printMeetup.meetupToRenderToDom(meetupData);
    },
    (reject) => {
    console.log("SOMETHING WENT REALLY WRONG");
    });



   module.exports = {callMeetupApi};