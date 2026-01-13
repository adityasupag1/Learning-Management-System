const bcrypt = require('bcrypt')
const validator = require("validator");
const userModel = require('../models/userModel')
const generateToken = require("../utils/generateToken")
const sendMail = require('../utils/sendMail')

module.exports.signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" })
    }
    // first check: is email already exist or not
    const existUser = await userModel.findOne({ email })
    if (existUser) return res.status(400).json({ message: "Email Already Exist" })


    if (password.length < 8) {
      return res.status(400).json({ message: "Minimun Password Length should be 8" });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role
    })

    // now generate jwt token
    const token = generateToken({ id: user._id })

    // storing them into cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // OK for http://localhost
      sameSite: "lax",    // 🔴 THIS IS THE KEY FIX
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(201).json({ name: user.name, message: "User Created Successfully" })

  } catch (error) {
    res.status(500).json({ message: `Error in signup Error ${error}` })
  }
}

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please Fill all required Field" })
    }

    // is user exist or not
    const existUser = await userModel.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // password checking
    const isValid = await bcrypt.compare(password, existUser.password)

    if (!isValid) {
      return res.status(400).json({ message: "Please Enter Valid Password" });
    }

    // token generate
    const token = generateToken({ id: existUser._id });

    // storing in the browser cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // OK for http://localhost
      sameSite: "lax",    // 🔴 THIS IS THE KEY FIX
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({ name: existUser.name, message: "LogIn Successfully" })


  } catch (error) {
    res.status(500).json({ message: `Error in Login  ${error}` })
  }
}

module.exports.logoutController = async (req, res) => {
  try {
    await res.clearCookie("token")
    res.status(200).json({ message: "LogOut Successfully" })
  } catch (error) {
    res.status(500).json({ message: `Error in Login  ${error}` })
  }
}

module.exports.sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User Not Found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString;
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "Otp sent Successfully" })

  } catch (error) {
    res.status(500).json({ message: `Send Otp Error  ${error}` })
  }
}


module.exports.verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now())
      res.status(404).json({ message: "Invalid Otp" });

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Otp Verified Successfully" })


  } catch (error) {
    res.status(500).json({ message: `Verify Otp error  ${error}` })
  }
}


module.exports.resetPasswrodController = async(req,res)=>{
  try {
     const {email, newpassword}= req.body;
    const user =await userModel.findOne({email});
    if(!user || user.isOtpVerified)
      return res.status(404).json({message: "Otp verification is required"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newpassword, salt);
    user.password= hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({message: "Reset Password Successfully"})

  } catch (error) {
     return res.status(200).json({message: "Reset Password Error"})
  }
}