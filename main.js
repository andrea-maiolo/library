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
//this is to show the form for adding a book
const addNewBook = document.querySelector('#addNewBook');
addNewBook.addEventListener('click', () => {
    formAddingBook.style.display = "block";
    adding.style.display = "block";
    addNewBook.style.display = "none"
})

//this button will actually add the books on the shelf
adding.addEventListener('click', addingToLibrary);

// //this is the construct for the books, all our books need to be created from here
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    getInfo(){
        return this.info()
    }
    
    info() {
            return console.log("hello")
            // let r;
            // // if (read === true) {
            // //     r = "read already"
            // // } else {
            // //     r = "not read yet"
            // // }
            // return `${title} by ${author}, ${pages} pages, ${r}`
        }
}


//this is going to be our library
let library = [];

//this will check at the beginning of the file for a localLibrary
const isThereALibrary = (function() {
    let provisionalLib = JSON.parse(localStorage.getItem("localLibrary"));
    if (provisionalLib.length > 0) {
        library = provisionalLib
    } else {
        throw new Error("provisionalLib is null")
        // return
    }
})();


//this will display the local Library
const displayLocalLibrary = (function() {
    if (library.length > 0) {
        for (let i = 0; i < library.length; i++) {
            showMe(library[i])
        }
    }
})()

function addingToLibrary() {
    if ((title.value != '' && author.value != '' && pages.value != '') && (statusRead.checked || statusToRead.checked)) {
        if (statusRead.checked) {
            var read = true;
        } else if (statusToRead.checked) {
            read = false;
        }
        let newB = new Book(title.value, author.value, pages.value, read);
        library.push(newB)
        showMe(newB)
        movingIntoStorage()
    }
}


//show me the library
function showMe(element) {
    let myBook = document.createElement('div');
    myBook.classList.add("books");
    let myBookTitle = document.createElement('p');
    myBookTitle.innerHTML = element.title;
    let myBookAuthor = document.createElement('p');
    myBookAuthor.innerHTML = element.author;
    let myBookPages = document.createElement('p');
    myBookPages.innerHTML = element.pages;

    let myBookInfo = document.createElement('button');
    let iconI = document.createElement("i");
    iconI.classList.add('glyphicon');
    iconI.classList.add('glyphicon-info-sign');
    myBookInfo.appendChild(iconI);
    //need to understand how to make info work
    // myBookInfo.addEventListener('click', () => {
    //     console.log(element)
    // });

    let readOrNot = element.read;
    let myBookStatus = document.createElement('button');
    myBookStatus.classList.add('bs');
    let iconBS = document.createElement("i");
    iconBS.classList.add('glyphicon');
    iconBS.classList.add('glyphicon-book');
    myBookStatus.appendChild(iconBS);
    if (element.read == true) {
        myBookStatus.style.backgroundColor = "green";
    } else {
        myBookStatus.style.backgroundColor = "red";
    }
    myBookStatus.addEventListener("click", () =>{
       if(myBookStatus.style.backgroundColor == 'red'){
        myBookStatus.style.backgroundColor = 'green';
       }else if(myBookStatus.style.backgroundColor == 'green'){
           myBookStatus.style.backgroundColor = 'red'
       }
       tog(element);
    });

    let removeButton = document.createElement('button');
    removeButton.innerHTML = "x";
    removeButton.classList.add("remB")
    removeButton.addEventListener('click', () => {
        display.removeChild(myBook);
        cleanLibrary(element)
    });
    myBook.appendChild(removeButton)
    myBook.appendChild(myBookTitle);
    myBook.appendChild(myBookAuthor);
    myBook.appendChild(myBookPages);
    myBook.appendChild(myBookStatus)
    myBook.appendChild(myBookInfo);
    display.appendChild(myBook);
}

//this is to remove the  book from the library array
function cleanLibrary(ele) {
    index = library.indexOf(ele)
    library.splice(index, 1)
}

function tog(element){
    console.log(element.read)
    if(element.read ==true){
        element.read = false
    }else if (element.read ==false){
        element.read = true
    }
}

//this show the form will set the button status color
// function toggleRead(ele, button) {
//     //this change the status on the library array
//     if (ele.read == true) {
//         ele.read = false
//     } else {
//         ele.read = true
//     }
//     //this change the colour
//     if (ele.read == true) {
//         button.style.background = "green";
//     } else {
//         button.style.background = "red";
//     }
// }

//this is the function that moves library into localStorage
function movingIntoStorage() {
    l = JSON.stringify(library);
    window.localStorage.setItem("localLibrary", l)
};
