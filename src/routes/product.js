import { Router } from "express";
import { createProduct, deleteProductByID, getAllProducts, getAllProductsByCategory, getDetailProduct, updateProductByID } from "../controllers/productsController.js";
import { checkBodyRequestProducts } from "../middlewares/products/checkBodyRequestProducts.js";
import { checkPermissionAdmin } from "../middlewares/permissions/checkPermission.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getDetailProduct);
productRouter.post("/", checkPermissionAdmin, checkBodyRequestProducts, createProduct);
productRouter.put("/:id", checkPermissionAdmin, checkBodyRequestProducts, updateProductByID);
productRouter.get("/category/:idcate", getAllProductsByCategory);
productRouter.delete('/:id', checkPermissionAdmin, deleteProductByID);

export default productRouter;