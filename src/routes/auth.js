import express from "express";

import { signupController, signinController } from "../controller/auth.js";
import { isAuthRequesteValidated, validateSignupReq, validateSigninReq } from "../middleware/validatores.js";
const router = express.Router();


router.post("/signin",validateSigninReq,isAuthRequesteValidated, signinController)

router.post("/signup",validateSignupReq,isAuthRequesteValidated ,signupController)

export default router