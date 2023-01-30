import express from "express";
import { signupController, signinController } from "../../controller/admin/auth.js";
import { validateSignupReq, validateSigninReq, isAuthRequesteValidated } from "../../middleware/validatores.js";
const router = express.Router();


router.post("/admin/signin",validateSigninReq,isAuthRequesteValidated,signinController)

router.post("/admin/signup",validateSignupReq,isAuthRequesteValidated ,signupController)

export default router