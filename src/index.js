import express from "express";
import env from "dotenv"
import bodyParser from "body-parser";
import mongoose from "mongoose";

import  authRoutes from "./routes/auth.js"
import  adminAuthRouts from "./routes/admin/auth.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"
import { imagePath } from "./utils/helpers.js";

const app = express();

env.config();

const MONGO_URI=`mongodb+srv://subhradwip:${process.env.MONGO_PASS}@flipkart0.6fif4l7.mongodb.net/?retryWrites=true&w=majority`

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/image",express.static(imagePath))
app.use("/api",authRoutes)
app.use("/api",adminAuthRouts)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",cartRoutes)

app.listen(process.env.PORT || process.env.PORT,()=>{
    console.log(`Server started at ${process.env.PORT}`)
    mongoose.connect(MONGO_URI,
        {useNewUrlParser: true}
      ).then(()=>{
        console.log("DB connected")
    }).catch(e=>console.log("Error in connection",e))
})