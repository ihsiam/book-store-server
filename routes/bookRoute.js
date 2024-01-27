const { GetBooks, UploadBook, UpdateBook, DeleteBook } = require("../controllers/bookRouteController");

const bookRoute = require("express").Router();

bookRoute.get('/allBooks', GetBooks);

bookRoute.post('/uploadBook', UploadBook);

bookRoute.patch('/book/:id', UpdateBook);

bookRoute.delete('/book/:id', DeleteBook);

module.exports = bookRoute;