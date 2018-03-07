"use strict";

let newsDiv = document.getElementById("news");

function taco(data) {
  let trunData = data.articles;
  trunData.splice(9, 10);
  trunData.forEach((article) => {
    let source = article.source;
    let headline = {
      title: article.title,
      description: article.description,
      source_name: source.name,
      url: source.url,
      image: (article.urlToImage === null) ? "Some text" : article.urlToImage
    };
    newsDiv.innerHTML += `<div><img src="${article.urlToImage}"><h3>${headline.title}</h3><h4>${headline.source_name}</h4><p>${headline.description}</p><a href="${headline.url}" target="_blank">Read more&hellip;</a></div>`;
    });
  }

module.exports = {taco};
