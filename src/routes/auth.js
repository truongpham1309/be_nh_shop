import { Router } from "express";
import { checkBodyRequestLogin, checkBodyRequestRegister } from "../middlewares/users/checkBodyRequestUsers.js";
import { authLogin, authRegister } from "../controllers/authControllers.js";

const authRouter = Router();
authRouter.post("/login", checkBodyRequestLogin, authLogin);
authRouter.post("/register", checkBodyRequestRegister, authRegister);

export default authRouter