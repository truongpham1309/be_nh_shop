import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from './product.js';
import cateRoter from "./category.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", cateRoter);


export default router