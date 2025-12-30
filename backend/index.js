const express = require('express')
const app = express();
require('dotenv').config();
const connectToDb = require('./config/db')
const userModel = require("./models/userModel")
const cookieParser = require("cookie-parser")
const authRouter = require('./Routes/authRoute')
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
   origin : process.env.FRONTEND_URL,
   credentials : true,
}))

app.use("/api/auth", authRouter)






app.listen(process.env.PORT, ()=>{
  console.log("server is running")
  connectToDb();
})