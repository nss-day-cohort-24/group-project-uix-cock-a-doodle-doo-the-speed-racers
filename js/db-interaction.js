"use strict";

console.log("Hello db-interaction.js");

let firebase = require("./fb-config");
let headlines = require("./dom-builder");

function prepArticleForSaving(saveButton) {
  let particularArticle = saveButton.parentNode.id;
  let idPieces = particularArticle.split("--");
  let position = idPieces[1];
  let headlineList = headlines.giveAllHeadlines();
  console.log(headlineList);
  let targetArticle = headlineList.{position};
  console.log(targetArticle);
  return targetArticle;
}

module.exports ={prepArticleForSaving};
