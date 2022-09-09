const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, 
    addNewBook, updateBookById, getSingleBookByName } = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();


/*
route: /books
method : get
description: get all books
access: public
parameters: none
*/ 


// router.get("/", (req,res) => {
//     res.status(202).json({
//         success:true,
//         data: books
//     })
// });

router.get("/", getAllBooks);

/*
route: /books/:id
method : get
description: get books by id
access: public
parameters: id
*/ 

router.get("/:id", getSingleBookById);

router.get("/getbook/name/:name", getSingleBookByName);

/*
route: /books/issued/books
method : get
description: get books by id
access: public
parameters: id
*/ 

router.get("/issued/books", getAllIssuedBooks);

/*
route: /books
method : Post
description: create new book
access: public
parameters: none
data: author, name, genre, price, publisher, id
*/ 

router.post("/", addNewBook);


/*
route: /books/:id
method : PUT
description: updating book
access: public
parameters: id
data: author, name, genre, price, publisher, id
*/

router.put("/:id", updateBookById)

//default exports
module.exports = router;