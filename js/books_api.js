"use strict";

// variables and eventlisteners
let searchBook = document.getElementById("searchBook"),
    outputBook = document.getElementById("outputBook"),
    login = require("./user"),
    firebase = require("./fb-config"),
    savedBooks = document.getElementById("savedBooks"),
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

// .then(); handles all looping and printing to DOM
let printBkSearch = (resolve) => {
    outputBook.innerHTML = "";
    let i = 0;

    for (let item in resolve.docs){
        let fullItem  = resolve.docs[item];

        //ternary operator (checks if the data is undefined or not && checks the amount of editions)
        let itemList = {
            sub: fullItem.subtitle ? `: ${fullItem.subtitle}` : "",
            author: fullItem.author_name ? `${fullItem.author_name}` : "Unknown",
            uStatus: fullItem.author_name ? "" : "uknow",
            pubDate: fullItem.first_publish_year ?  `- first published in ${fullItem.first_publish_year}` : "",
            ed: fullItem.edition_count > 1 ? "editions" : "edition",
        };
        
        //Print to DOM
        outputBook.innerHTML += 
        `<div class="prnt">
        <h1>${fullItem.title}${itemList.sub}</h1>
        <h2 class=${itemList.uStatus}>by ${itemList.author}</h2>
        <p>${fullItem.edition_count} ${itemList.ed} ${itemList.pubDate}</p>
        <button id="books--${i}" class="save">Save</button>
        </div>`;
        i++;
    }
};

/////////////////////////////////////////////
/// IN REGARDS TO SAVING && DELETING DATA ///
/////////////////////////////////////////////

//////////////////////
/// SECTION 1 SAVE ///
//////////////////////
document.querySelector("body").addEventListener("click", saveBook);

//clicked build data
function saveBook(event){
    if (event.target.className === "save"){
        console.log("id", event.target.id);
        let id = event.target.id;
        let bookObj = buildBookObj(id);
        addBook(bookObj).then(
            (resolve) =>{
                loadSaveBooks();
            });
    }
}

// data builder
function buildBookObj(input){
    let id = input;
    let bookObj = {
        title: $(`#${id}`).siblings().eq(0).text(),
        author: $(`#${id}`).siblings().eq(1).text(),
        description: $(`#${id}`).siblings().eq(2).text(),
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

///////////////////////
/// SECTION 2 PRINT ///
///////////////////////
let savedLoad = document.getElementById("savedBooks");
savedLoad.addEventListener("click", loadSaveBooks);

// in charge of printing to DOM
function loadSaveBooks() {
    let currentUser = login.getUser();
    FbBooks(currentUser).then(
        (resolve) => {
            printBkSave(resolve);
        },
        (reject) => {
            console.log("didn't load");
        }
    );
}

//data call for books
let FbBooks = (input) => {
    return new Promise ((resolve, reject) => {
        var FB = `https://cadd-speed-racers.firebaseio.com/books.json?orderBy="uid"&equalTo="${input}"`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", FB);
        request.send();
    });
};

//print to DOM for save
let printBkSave = (resolve) => {
    savedBooks.innerHTML = "";

    for (let item in resolve){
        let fullItem  = resolve[item];

        //ternary operator (checks if the data is undefined or not && checks the amount of editions)
        let itemList = {
            uStatus: fullItem.author == "by Unknown" ? "" : "uknow"
        };
        
        //Print to DOM
        savedBooks.innerHTML += 
        `<div class="prntSave">
        <h1>SAVED BOOK</h1>
        <h1>${fullItem.title}</h1>
        <h2 class=${itemList.uStatus}>${fullItem.author}</h2>
        <p>${fullItem.description}</p>
        <button id="${item}" class="delete">Delete</button>
        </div>`;
    }
};

////////////////////////
/// SECTION 3 DELETE ///
////////////////////////
$(document).on("click", ".delete", deleteBook);

// //clicked delete data
function deleteBook(event){
        let bookID = event.target.id;
        console.log("bookID", bookID);
        removeBook(bookID).then(
            (resolve) => {
                loadSaveBooks();
            },
            (reject) => {
                console.log("didn't load");
            }
        );
}

// //data deleter
function removeBook(bookId){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/books/${bookId}.json`,
        type: 'DELETE'
    }).done((data) => {
        return data;
    });
}