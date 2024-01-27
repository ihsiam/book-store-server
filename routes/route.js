const bookRoute = require('./bookRoute');
const { HomeRes } = require("../controllers/routerController");

const route = require("express").Router();

route.get('/', HomeRes);

route.use(bookRoute);

module.exports = route;