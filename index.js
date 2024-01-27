// dependencies 
const express = require("express");
const cors = require("cors");

// .env import
require("dotenv").config();

// Router import
const router = require("./routes/route");

// Express init
const app = express();

// port define
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// All router implement
app.use(router);

// 404 page handle
app.use((req, res, next) => {
     res.send("Page not found");
})

// Server error handle
app.use((err, req, res, next) => {
     res.send("Server error");
     console.log(err);
})

// run server
app.listen(port, () => {
     console.log("Server is running");
});