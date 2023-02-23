import express from "express"
import { createProductController, getProductController } from "../controller/product.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { isValidFile } from "../middleware/validatores.js";
import { upload } from "../utils/helpers.js";
const router = express.Router();


router.post("/product/create",isAuthenticated,isAdmin,upload.array('productPictures'),createProductController)
router.get("/product/getproducts",getProductController)
export default router