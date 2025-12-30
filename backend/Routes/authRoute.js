const express = require('express')

const authRouter = express.Router();
const {signupController, loginController, logoutController}= require('../controllers/authController')
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.get('/logout', logoutController)

module.exports=authRouter