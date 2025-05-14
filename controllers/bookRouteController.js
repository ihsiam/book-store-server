// Dependences
const Admin = require('../model/adminModel');
const Book = require('../model/bookModel');
const { ObjectId } = require('mongodb');

// Get all books
exports.GetBooks = async (req, res) =>{
     // find from db
     const books = Book.find();
     // convert to array
     const result = await books.toArray();
     // response send
     res.send(result);
}


// Upload book
exports.UploadBook = async (req, res) => {
     const adminId = req.id;
     const newbooks = new Book({
                 ...req.body,
                 adminId,
             });
     const result = await newbooks.save();
     const { _id } = newbooks;
     // add todo id into user model
     await Admin.updateOne(
          { _id: adminId },
          {
               $push: {
               books: _id,
               },
               // eslint-disable-next-line comma-dangle
          }
     );
     // response send
     res.send(result);
}

// get a book
exports.getBookData = async (req, res) => {
     // get the id
     const id = req.params.id;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // find from db
     const result = await Book.findOne(filter);
     //response send
     res.send(result);
}


// Update a book
exports.UpdateBook = async (req, res) => {
     // get the id
     const id = req.params.id;
     // get update data 
     const updateData = req.body;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // upsert 
     const options = { upsert: true };
     // set update data
     const updateDoc = {
          $set: {...updateData},
          };
     // update on db
     const result = await Book.updateOne(filter, updateDoc, options);
     // response send
     res.send(result);
}


// Delete a book
exports.DeleteBook = async (req, res) => {
     const adminId = req.id;
     // get the id
     const id = req.params.id;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // delete from db
     const result = await  Book.deleteOne(filter);

     // delete from user model
     await Admin.updateOne(
          { _id: adminId },
          {
               $pull: {
               books: id,
               },
               // eslint-disable-next-line prettier/prettier
          },
     );
     //response send
     res.send(result);
}