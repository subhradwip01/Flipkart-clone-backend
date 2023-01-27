import express from "express";
import { signupController } from "../controller/auth.js";
const router = express.Router();


router.post("/signin",(req,res,next)=>{


})



router.post("/signup",signupController)

export default router