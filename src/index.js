import express from "express";
import env from "dotenv"
import bodyParser from "body-parser";
import mongoose from "mongoose";

import  userRoutes from "./routes/user.js"

const app = express();

env.config();

const MONGO_URI=`mongodb+srv://subhradwip:${process.env.MONGO_PASS}@flipkart0.6fif4l7.mongodb.net/?retryWrites=true&w=majority`

app.use(bodyParser());

app.use("/api",userRoutes)

app.listen(process.env.PORT || process.env.PORT,()=>{
    console.log(`Server started at ${process.env.PORT}`)
    mongoose.connect(MONGO_URI,
        {useNewUrlParser: true}
      ).then(()=>{
        console.log("DB connected")
    }).catch(e=>console.log("Error in connection",e))
})