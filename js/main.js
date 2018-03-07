"use strict";

let news_api = require('./news_api');
let newsToDom = require('.dom-builder');

news_api.getHeadlines()
  .then(resolve); {
    newsToDom.taco(data);
  }
