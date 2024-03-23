import { Router } from "express";
import { getAllProducts } from "../controllers/productsController.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

export default productRouter;