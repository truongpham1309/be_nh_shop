import { Router } from "express";
import { cancelOrderByID, createOrderByUser, getAllOrder, getAllOrderByUserID, getDetailOrder, updateStatusOrderByID } from "../controllers/orderController.js";


const orderRouter = Router();

orderRouter.post('/', createOrderByUser);
orderRouter.get('/user', getAllOrderByUserID);
orderRouter.get("/", getAllOrder);
orderRouter.get("/detail/:id", getDetailOrder);
orderRouter.put("/:id", updateStatusOrderByID);
orderRouter.put("/cancel/:id", cancelOrderByID);


export default orderRouter