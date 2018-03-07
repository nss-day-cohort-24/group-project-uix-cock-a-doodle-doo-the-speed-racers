"use strict";

let api_calls = {};
let base = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b8395cf55b0b4b42b415224d307e5713";
let headlines = [];

let getHeadlines = () => {
  console.log("Here's what you need to know today.");

  let newsXHR = new XMLHttpRequest();

  newsXHR.addEventListener("load", function() {
    let data = JSON.parse(this.responseText);
    console.log("data in call", data);
    headlines = data.results;
  });

  newsXHR.addEventListener("error", function(){
    console.log("you have an error with the XHR call - check spelling");
  });

  newsXHR.open("GET", `${base}`);
  newsXHR.send();
};

api_calls.giveHeadlines = () => {
  getHeadlines();
  return headlines;
};

module.exports = {api_calls};
