"use strict";

console.log("Hello db-interaction.js");

let firebase = require("./fb-config");
let headlines = require("./dom-builder");

function prepArticleForSaving(saveButton) {
  let particularArticle = saveButton.parentNode.id;
  let idPieces = particularArticle.split("--");
  let position = idPieces[1];
  let headlineList = headlines.giveAllHeadlines();
  let targetArticle = headlineList[position];
  // console.log(targetArticle));
  return targetArticle;
}

let saveHeadline = (headline) => {
    return new Promise((resolve, reject) => {
    let saveXHR = new XMLHttpRequest();

    saveXHR.addEventListener("load", function() {
      let data = JSON.parse(this.responseText);
      // console.log("data in call", data);
      resolve(data);
    });

    saveXHR.addEventListener("error", function(){
      var error = saveXHR.statusText;
      reject(error);
    });

    saveXHR.open("POST", `${firebase.getFBsettings().databaseURL}/news.json`);
    saveXHR.send(JSON.stringify(headline));
  });
};

module.exports ={prepArticleForSaving, saveHeadline};
