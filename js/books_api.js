"use strict";

// variables and eventlisteners
let searchBook = document.getElementById("searchBook"),
    outputBook = document.getElementById("outputBook"),
    login = require("./user"),
    firebase = require("./fb-config"),
    $ = require('jquery');
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

// calls data && limits it to only 10 items
let dataBook = (input) => {
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

// filler image if the book doesn't have an image
let filler = `https://www.webcastlive.es/errores/404/images/03.png`;

// .then(); handles all looping and printing to DOM
let printBkSearch = (resolve) => {
    outputBook.innerHTML = "";

    for (let item in resolve.docs){
        let fullItem  = resolve.docs[item];

        //ternary operator (checks if the data is undefined or not && checks the amount of editions)
        let itemList = {
            sub: fullItem.subtitle ? `: ${fullItem.subtitle}` : "",
            author: fullItem.author_name ? `${fullItem.author_name}` : "Unknown",
            uStatus: fullItem.author_name ? "" : "uknow",
            pubDate: fullItem.first_publish_year ?  `- first published in ${fullItem.first_publish_year}` : "",
            ed: fullItem.edition_count > 1 ? "editions" : "edition",
            image: fullItem.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${fullItem.cover_edition_key}-M.jpg` : `${filler}`
        };
        
        //Print to DOM
        outputBook.innerHTML += 
        `<div class="prnt">
        <h1>${fullItem.title}${itemList.sub}</h1>
        <h2 class=${itemList.uStatus}>by ${itemList.author}</h2>
        <p>${fullItem.edition_count} ${itemList.ed} ${itemList.pubDate}</p>
        <button class="save">Save</button>
        </div>`;
    }
};

document.querySelector("body").addEventListener("click", saveBook);

//clicked build data
function saveBook(event){
    if (event.target.className === "save"){
        let bookObj = buildBookObj();
        addBook(bookObj).then(
            (resolve) =>{
                console.log("DONE");
            });

        // console.log("CLICK SAVE", $(".save").siblings().eq(2).text());
    }
}

// data builder
function buildBookObj(){
    let bookObj = {
        title: $(".save").siblings().eq(0).text(),
        author: $(".save").siblings().eq(1).text(),
        description: $(".save").siblings().eq(2).text(),
        uid: login.getUser()
    };
    return bookObj;
}

//data poster
function addBook(bookFormObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/books.json`,
        type: 'POST',
        data: JSON.stringify(bookFormObj),
        dataType: 'json'
    }).done((bookID) => {
        return bookID;
    });
}

// let savedObj = {};
//savedObj.news() {
//  title:
//  source:
//  description:
//  uid: 
//}

//savedObj.meetups() {
//  title:
//  venue:
//  date:
//  time:
//  uid:
//}

//savedObj.books() {
//  title:
//  author:
//  description:
//  uid:
//}

//module.exports = {savedObj};
//savedObj.news();