import express from "express"
import { createCategoryController, getCategoryController } from "../controller/category.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../utils/helpers.js";
const router = express.Router();

router.post("/category/create",isAuthenticated,isAdmin,upload.single("categoryImage"),createCategoryController)
router.get("/category/getcategories",getCategoryController)
export default router