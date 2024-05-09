// dependencies
const express = require('express');
const { register, logIn } = require('../controllers/userHandler');
const UserRouter = express.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', logIn);

module.exports = UserRouter;