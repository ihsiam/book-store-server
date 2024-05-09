// Controller import
const { HomeRes } = require("../controllers/routerController");

// Router define
const router = require("express").Router();

// Book route import
const bookRouter = require('./bookRoute');
const UserRouter = require("./userRouter");

// Server home page response
router.get('/', HomeRes);

//user router

router.use(UserRouter);

// Book router
router.use(bookRouter);

// Module export
module.exports = router;