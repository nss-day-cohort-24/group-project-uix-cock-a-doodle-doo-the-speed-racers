"use strict";

console.log("Hello db-interaction.js");

let firebase = require("./fb-config");

function saveArticle() {
      return new Promise((resolve, reject) => {
      let saveArticleXHR = new XMLHttpRequest();

      saveArticleXHR.addEventListener("load", function() {
        let data = JSON.parse(this.responseText);
        // console.log("data in call", data);
        resolve(data);
      });

      saveArticleXHR.addEventListener("error", function(){
        var error = saveArticleXHR.statusText;
        reject(error);
      });

      saveArticleXHR.open("POST", `${firebase.getFBsettings().databaseURL}/books.json`);
      saveArticleXHR.send();
    });
  }

module.exports = {};
