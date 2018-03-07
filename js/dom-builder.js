"use strict";
let $ = require('jquery'),
meetupAPI = require('./meetup-api.js');



///function to print the list of meetups
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

//meetupToRenderToDom(meetupArray);



module.exports = {meetupToRenderToDom};