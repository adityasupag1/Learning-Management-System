const mongoose = require('mongoose')

const connectToDb =async ()=>{
  try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Connected to DB")
   } catch (error) {
     console.log("Failed to Connect to DB", error)
   }
}

module.exports = connectToDb;