import express from "express";
import { signupController, signinController } from "../../controller/admin/auth.js";
const router = express.Router();


router.post("/admin/signin",signinController)

router.post("/admin/signup",signupController)

export default router