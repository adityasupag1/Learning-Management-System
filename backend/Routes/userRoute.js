const express = require('express');
const userRouter = express.Router();
const isAuth = require("../middleware/isAuth")
const {getCurrentUser} = require("../controllers/userController")

userRouter.get('/getcurrentuser', isAuth,getCurrentUser);

module.exports = userRouter