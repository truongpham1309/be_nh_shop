import { Router } from "express";
import movieRoute from "./movie.js";
import authRoute from "./user.js";


const router = Router();

router.use('/dashboard/movie', movieRoute);
router.use('/auth', authRoute);

export default router