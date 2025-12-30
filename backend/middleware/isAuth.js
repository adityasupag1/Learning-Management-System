const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userId = user._id;
    req.user = user; // very important for role-based access
     console.log("isAuth : ", user);
     
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
