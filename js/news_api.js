"use strict";

//News.org API
let base = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b8395cf55b0b4b42b415224d307e5713";

let getHeadlines = () => {
    return new Promise((resolve, reject) => {
    let newsXHR = new XMLHttpRequest();

    newsXHR.addEventListener("load", function() {
      let data = JSON.parse(this.responseText);
      console.log("data in call", data);
      resolve(data);
    });

    newsXHR.addEventListener("error", function(){
      var error = newsXHR.statusText;
      reject(error);
    });

    newsXHR.open("GET", `${base}`);
    newsXHR.send();
  });
};

module.exports = {getHeadlines};
