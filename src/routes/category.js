import express from "express"
import slugify from "slugify";
import { createCategoryController } from "../controller/category.js";
import Category from "../models/category.js";
const router = express.Router();

router.post("/category/create",createCategoryController)

export default router