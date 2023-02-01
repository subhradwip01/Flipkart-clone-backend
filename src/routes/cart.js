import express from "express"
import { addCartItemsController, getCartItemsController } from "../controller/cart.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/user/cart/addCartItem",isAuthenticated,addCartItemsController)
router.get("/user/cart/getcartItem",isAuthenticated,getCartItemsController)

export default router