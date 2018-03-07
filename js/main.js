"use strict";

let news_api = require('./news_api');
let newsToDom = require('./dom-builder');
// books api calls
let books = require('./books_api');

news_api.getHeadlines()
  .then((resolve) => {
    newsToDom.taco(resolve);
});