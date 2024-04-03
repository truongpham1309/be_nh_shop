import { Router } from "express";
import { createOrderByUser, getAllOrderByUserID } from "../controllers/orderController.js";


const orderRouter = Router();

orderRouter.post('/', createOrderByUser);
orderRouter.get('/', getAllOrderByUserID);

export default orderRouter