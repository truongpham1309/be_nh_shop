import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from './product.js';
import cateRoter from "./category.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", cateRoter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter)

export default router