import mongoose from "mongoose";


const tagSchema = new mongoose.Schema({
    tag_name: {
        type: String,
        required: true,
        unique: true,
    }
})