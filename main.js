"use strict"

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
//this is for the display so we can add books on the shelf
const display = document.querySelector('#display')
//radio buttons
const statusRead = document.querySelector('#statusRead');
const statusToRead = document.querySelector('#statusToRead');
//this show the form when clicked
const formAddingBook = document.querySelector('#formAddingBook');
const adding = document.querySelector('#adding');

// //this is the construct for the books, all our books need to be created from here
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//this is going to be our library
let library = [];

//this will check at the beginning of the file for a localLibrary
const isThereALibrary = (function() {
    let provisionalLib = JSON.parse(localStorage.getItem("localLibrary"));
    if (provisionalLib.length > 0) {
        library = provisionalLib
    }
})();

//show me the library
const showMe = function(element) {
    let myBook = document.createElement('div');
    myBook.classList.add("books");
    let myBookTitle = document.createElement('p');
    myBookTitle.innerHTML = element.title;
    let myBookAuthor = document.createElement('p');
    myBookAuthor.innerHTML = `By: ${element.author}`;
    let myBookPages = document.createElement('p');
    myBookPages.innerHTML = `Pages: ${element.pages}`;
    myBookTitle.classList.add('pOfBook');
    myBookAuthor.classList.add('pOfBook');
    myBookPages.classList.add('pOfBook');


    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');

    let myBookInfo = document.createElement('button');
    let iconI = document.createElement("i");
    iconI.classList.add('glyphicon');
    iconI.classList.add('glyphicon-info-sign');
    myBookInfo.appendChild(iconI);
    myBookInfo.classList.add('infoButton')
    myBookInfo.addEventListener('click', () => {
        let a;
        element.read == true ? a = "already read" : a = "not read yet";
        alert(`${element.title} by ${element.author}, ${element.pages} in total, status ${a}`)
    });

    let readOrNot = element.read;
    let myBookStatus = document.createElement('button');
    myBookStatus.classList.add('statusButton');
    let iconBS = document.createElement("i");
    iconBS.classList.add('glyphicon');
    iconBS.classList.add('glyphicon-book');
    myBookStatus.appendChild(iconBS);
    if (element.read == true) {
        myBook.style.backgroundColor = "#5eeb8a";
        myBookStatus.setAttribute("currentS", "g")
    } else {
        myBook.style.backgroundColor = "#eb5d78";
        myBookStatus.setAttribute("currentS", "r")
    }
    myBookStatus.addEventListener("click", () => {
        let c = myBookStatus.getAttribute("currentS");
        if (c == 'g') {
            myBook.style.backgroundColor = 'rgb(235,93,120)';
            myBookStatus.setAttribute("currentS", "r");
        } else if (c == 'r') {
            myBook.style.backgroundColor = 'rgb(94,235,138)';
            myBookStatus.setAttribute("currentS", "g")
        }
        toggleStatus(element);
    });

    buttonDiv.appendChild(myBookStatus);
    buttonDiv.appendChild(myBookInfo);

    let removeButton = document.createElement('button');
    let trashI = document.createElement("i");
    trashI.classList.add('glyphicon');
    trashI.classList.add('glyphicon-trash');
    removeButton.appendChild(trashI);
    removeButton.classList.add("remB")
    removeButton.addEventListener('click', () => {
        display.removeChild(myBook);
        cleanLibrary(element)
    });
    myBook.appendChild(removeButton)
    myBook.appendChild(myBookTitle);
    myBook.appendChild(myBookAuthor);
    myBook.appendChild(myBookPages);
    myBook.appendChild(buttonDiv)
    display.appendChild(myBook);
}


const addingToLibrary = function() {
    if ((title.value != '' && author.value != '' && pages.value != '') && (statusRead.checked || statusToRead.checked)) {
        if (statusRead.checked) {
            var read = true;
        } else if (statusToRead.checked) {
            read = false;
        }
        //purify input
        let t;
        t = encodeURIComponent(title.value);
        if(t.length >40){
            t = t.slice(0,40);
        }
        let a;
        a = encodeURIComponent(author.value);
        if(a.length >20){
            a = a.slice(0,20);
        }
        let newB = new Book(t, a, pages.value, read);
        library.push(newB)
        showMe(newB)
        movingIntoStorage()
    }
}


//this is to remove the  book from the library array
const cleanLibrary = function(ele) {
    let index = library.indexOf(ele)
    library.splice(index, 1)
}

const toggleStatus = function(element) {
    if (element.read == true) {
        element.read = false
    } else if (element.read == false) {
        element.read = true
    }
}

//this is the function that moves library into localStorage
const movingIntoStorage = function() {
    let l = JSON.stringify(library);
    window.localStorage.setItem("localLibrary", l)
};

//this will display the local Library
const displayLocalLibrary = (function() {
    if (library.length > 0) {
        for (let i = 0; i < library.length; i++) {
            showMe(library[i])
        }
    }
})()

//this button will actually add the books on the shelf
adding.addEventListener('click', addingToLibrary);