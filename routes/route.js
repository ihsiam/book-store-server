// Controller import
const { HomeRes } = require("../controllers/routerController");

// Router define
const router = require("express").Router();

// Book route import
const bookRouter = require('./bookRoute');

// Server home page response
router.get('/', HomeRes);

// Book router
router.use(bookRouter);

// Module export
module.exports = router;