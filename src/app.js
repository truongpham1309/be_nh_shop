import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import router from './routes/index.js';

dotenv.config();

const { PORT, DB_URL, DB_URL_ATLAS } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(DB_URL_ATLAS)
    .then(() => console.log("Database connected!"))
    .catch(() => console.log("Database connect failed!"));

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})

