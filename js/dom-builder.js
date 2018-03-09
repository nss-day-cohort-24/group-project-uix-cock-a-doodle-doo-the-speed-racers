"use strict";

let $ = require('jquery');

// Meetups to DOM
function meetupToRenderToDom(meetupList) {
    console.log("meetupList", meetupList);
    let events = meetupList.events;
    events.forEach((event)=> {
      $('#meetups').append(`<div class="meetupevent">
      <h3>${event.group.name}</h3>
      <p> ${event.venue.name}<br>
      ${event.venue.address_1}<br></p>
      <p>${event.local_date} ${event.local_time}</p>
      <a target="_blank" href="${event.link}">learn more</a></div>`);
    });
}

//News to DOM
let newsDiv = document.getElementById("news");
let allHeadlines = {};

function chopData(data) {
  let trunData = data.articles;
  trunData.splice(9, 10);
  return trunData;
}

function giveAllHeadlines() {
  return allHeadlines;
}

function publishNews(aRay) {
  for(var i = 0; i < aRay.length; i++) {
    let article = aRay[i];
    let headline = {
      title: article.title,
      description: article.description,
      source_name: article.source.name,
      url: article.url,
      image: article.urlToImage
    };

    allHeadlines[i] = headline;
    newsDiv.innerHTML += `<div id="news_article--${i}"><img id="newsImage" src="${article.urlToImage}"><h3>${headline.title}</h3><h4>${headline.source_name}</h4><p>${headline.description}</p><a href="${headline.url}" target="_blank">Read more&hellip;</a><a href="#">Save</a></div>`;
    }
    console.log("allHeadlines", allHeadlines);
  }

module.exports = {publishNews, meetupToRenderToDom, chopData, giveAllHeadlines};
