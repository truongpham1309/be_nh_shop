import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getDetailCategory, updateCategory } from "../controllers/categoryController.js";


const cateRoter = Router();

cateRoter.get("/", getAllCategory);
cateRoter.post("/", createCategory);
cateRoter.put("/:id", updateCategory);
cateRoter.get("/:idcate", getDetailCategory);
cateRoter.delete("/:id", deleteCategory);

export default cateRoter