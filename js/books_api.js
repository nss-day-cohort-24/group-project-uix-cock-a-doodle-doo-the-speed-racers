"use strict";

let searchBook = document.getElementById("searchBook"),
    outputBook = document.getElementById("outputBook");
searchBook.addEventListener("keydown", searchingBk);

function searchingBk(event) {
    if (event.which === 13 || event.keyCode === 13) {

    // makes input into: this+is+input
    let theSplit = searchBook.value.replace(/ /g, "+");
    dataBook(theSplit).then(
        (resolve) => {
            printBkSearch(resolve);
        },
        (reject) => {
            console.log("didn't load");
        }
    );
    }
}

let dataBook = (input) => {

    // calls data using input/theSplit && limits to 10
    return new Promise ((resolve, reject) => {
        var bookBase = `http://openlibrary.org/search.json?q=${input}&limit=10`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", bookBase);
        request.send();
    });
};

// filler image for no images
let filler = `https://www.webcastlive.es/errores/404/images/03.png`;

let printBkSearch = (resolve) => {
    outputBook.innerHTML = "";

    // start of the loop
    for (let item in resolve.docs){
        let fullItem  = resolve.docs[item];

        //testing ternary operator (checks if the data is undefined or not && checks the amount of editions)
        let itemList = {
            sub: fullItem.subtitle ? `: ${fullItem.subtitle}` : "",
            author: fullItem.author_name ? `${fullItem.author_name}` : "Unknown",
            uStatus: fullItem.author_name ? "" : "uknow",
            pubDate: fullItem.first_publish_year ?  `- first published in ${fullItem.first_publish_year}` : "",
            ed: fullItem.edition_count > 1 ? "editions" : "edition",
            image: fullItem.cover_edition_key ? `<img class="image" src="https://covers.openlibrary.org/b/olid/${fullItem.cover_edition_key}-M.jpg">` : `<img class="image" src=${filler}>`
        };
        
        //Print to DOM
        outputBook.innerHTML += 
        `<div class="prnt">
        ${itemList.image}
        <h1>${fullItem.title}${itemList.sub}</h1>
        <h2 class=${itemList.uStatus}>by ${itemList.author}</h2>
        <p>${fullItem.edition_count} ${itemList.ed} ${itemList.pubDate}</p>
        </div>`;
    }
};