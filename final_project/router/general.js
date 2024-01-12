const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;


  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login."});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  }
  return res.status(404).json({message: "Unable to register user."});

});


//GEt the book list available in the shop using Promise callbacks or async-await with Axios
public_users.get('/books', async function (req, res) {
  try {
    await new Promise((resolve) => {
      resolve(res.send(JSON.stringify({ books }, null, 4)));
    });
    console.log("Promise for Task 10 resolved");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});


//Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
public_users.get('/isbn/:isbn', async function (req, res) {
  const byIsbn = req.params.isbn;
  try {
      await new Promise((resolve) => {    
      resolve(res.send(books[byIsbn]));
      });
      console.log("Promise for Task 10 resolved");
  } catch (error) {
      console.error("An error occurred:", error);
  }
});


//Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
public_users.get('/author/:author', async function (req, res) {
  const byAuthor = req.params.author;
  const booksArray = Object.values(books);

  try {
      await new Promise((resolve) => {
      let filtered_author = booksArray.filter((books) => books.author === byAuthor); 
      resolve(res.send(filtered_author));
      });
      console.log("Promise for Task 12 resolved");
  } catch (error) {
      console.error("An error occurred:", error); 
  }
});



//Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
public_users.get('/title/:title', async function (req, res) {
  const byTitle = req.params.title;
  const booksArray = Object.values(books);

  try {
      await new Promise((resolve) => {
      let filtered_title = booksArray.filter((books) => books.title === byTitle);
      resolve(res.send(filtered_title));
      });
      console.log("Promise for Task 12 resolved");
  } catch (error) {
      console.log("An error occurred:", error);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
const byIsbn = req.params.isbn;
res.send(books[byIsbn].reviews);//Write your code here
return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
