"use strict";
let $ = require('jquery');
//let printMeetup = require('./dom-builder');


//function to print the list of meetups
function meetupToRenderToDom(meetupList) {
    console.log("meetupList", meetupList);
  if(meetupList.events){
  for (let i = 0; i < 10; i++) {
      let eventsArray = meetupList.events;
      console.log("eventsArray", eventsArray);
          console.log("group name:", eventsArray[i].group.name);
          console.log("date:",eventsArray[i].local_date);
          console.log("time:",eventsArray[i].local_time);
          console.log("venue name:", eventsArray[i].venue.name);
          console.log("venue address:", eventsArray[i].venue.address_1); 
          console.log("meetup link", eventsArray[i].link);
          $('#meetups').append(`<li class="meetupevent">
          <h2>${eventsArray[i].group.name}</h2>
          <h3>${eventsArray[i].local_date} ${eventsArray[i].local_time}</h3>
          <p>${eventsArray[i].venue.name} - ${eventsArray[i].venue.address_1}<br>
          <a target="_blank" href="${eventsArray[i].link}">learn more</a></li>`);       
      } 
    }
}


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
        meetupToRenderToDom(meetupData);
    },
    (reject) => {
    console.log("SOMETHING WENT REALLY WRONG");
    });



   module.exports = {callMeetupApi};