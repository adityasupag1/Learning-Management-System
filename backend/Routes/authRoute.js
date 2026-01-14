const express = require('express')

const authRouter = express.Router();
const {
  signupController, 
  loginController, 
  logoutController,
  sendOtpController, 
  verifyOtpController,
  resetPasswrodController,
  googleAuthController}= require('../controllers/authController')
  
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.get('/logout', logoutController)
authRouter.post('/sendotp',sendOtpController);
authRouter.post('/verifyotp',verifyOtpController);
authRouter.post('/resetpassword',resetPasswrodController);
authRouter.post('/googleauth',googleAuthController);

module.exports=authRouter