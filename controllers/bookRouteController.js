const bookCollection = require('../config/db');
const { ObjectId } = require('mongodb');

exports.GetBooks = async (req, res) =>{
     // find from db
     const books = bookCollection.find();
     // convert to array
     const result = await books.toArray();
     // response send
     res.send(result);
}

exports.UploadBook = async (req, res) => {
     // get data 
     const data = req.body;
     // insert data on db
     const result = await bookCollection.insertOne(data);
     // response send
     res.send(result);
}

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
     const result = await bookCollection.updateOne(filter, updateDoc, options);
     // response send
     res.send(result);
}

exports.DeleteBook = async (req, res) => {
     // get the id
     const id = req.params.id;
     // create a filter
     const filter = { _id: new ObjectId(id) };
     // delete from db
     const result = await bookCollection.deleteOne(filter);
     //response send
     res.send(result);
}