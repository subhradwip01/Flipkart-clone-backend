import express from "express";
import { signupController, signinController } from "../../controller/admin/auth.js";
import { validateAuthReq, validateSigninReq, isAuthRequesteValidated } from "../../middleware/validatores.js";
const router = express.Router();


router.post("/admin/signin",validateSigninReq,isAuthRequesteValidated,signinController)

router.post("/admin/signup",validateAuthReq,isAuthRequesteValidated ,signupController)

export default router