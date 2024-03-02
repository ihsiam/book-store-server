// Controller import
const { GetBooks, UploadBook, UpdateBook, DeleteBook, getBookData,  } = require("../controllers/bookRouteController");

// Book router define
const bookRouter = require("express").Router();

// Get all books
bookRouter.get('/allBooks', GetBooks);

// Upload book
bookRouter.post('/uploadBook', UploadBook);

// get a book
bookRouter.get('/book/:id', getBookData);

// Update a book
bookRouter.patch('/book/:id', UpdateBook);

// Delete a book
bookRouter.delete('/book/:id', DeleteBook);

// Nodule export
module.exports = bookRouter;