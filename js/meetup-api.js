"use strict";
let $ = require('jquery');

//function to call the meetup APIs
function callMeetupApi(url) {
    console.log("callMeetupApi");
    return $.ajax({
    url: url,
    dataType: "json",
    });
  }

module.exports = {callMeetupApi};
