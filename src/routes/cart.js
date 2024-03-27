import { Router } from "express";
import { addToCart, getCartByUserID, removeCartByUserID, updateCartByUserID } from "../controllers/cartController.js";


const cartRouter = Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/user/:userID", getCartByUserID);
cartRouter.delete("/delete-to-cart", removeCartByUserID);
cartRouter.put("/update-cart", updateCartByUserID);

export default cartRouter