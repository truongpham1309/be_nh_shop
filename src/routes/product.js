import { Router } from "express";
import { createProduct, getAllProducts, getAllProductsByCategory, getDetailProduct, updateProductByID } from "../controllers/productsController.js";
import { checkBodyRequestProducts } from "../middlewares/products/checkBodyRequestProducts.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getDetailProduct);
productRouter.post("/", checkBodyRequestProducts, createProduct);
productRouter.put("/:id", checkBodyRequestProducts, updateProductByID);
productRouter.get("/category/:idcate", getAllProductsByCategory);

export default productRouter;