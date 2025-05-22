import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import router from './routes/index.js';

dotenv.config();

const { PORT, DB_URL_ATLAS } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
    try {
        await mongoose.connect(DB_URL_ATLAS);
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
})()

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})

