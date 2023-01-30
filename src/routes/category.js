import express from "express"
import { createCategoryController, getCategoryController } from "../controller/category.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/category/create",isAuthenticated,isAdmin,createCategoryController)
router.get("/category/getcategories",getCategoryController)
export default router