import { Router } from "express";
import { addToCart, decrementQuantity, getCartByUserID, incrementQuantity, removeCartByUserID, updateCartByUserID } from "../controllers/cartController.js";


const cartRouter = Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/user", getCartByUserID);
cartRouter.put("/delete-to-cart", removeCartByUserID);
cartRouter.put("/update-cart", updateCartByUserID);
cartRouter.put("/increment", incrementQuantity);
cartRouter.put("/decrement", decrementQuantity);

export default cartRouter