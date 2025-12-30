const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      enum: ["student", "educator"],
      required: true,
   },
   photoUrl: {
      type: String,
      default: "",
   },
   enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
   },]

}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)


module.exports = userModel;