"use strict";

require("../js/weather.js");

console.log("Hello main.js");
// console.log("Hello main.js");

let news = require('./news_api');

// news.api_calls.getHeadlines();
news.api_calls.giveHeadlines();

