import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: "member",
    },
    image: {
        type: String,
    }
},{
    versionKey: false,
    timestamps: true
})

export default mongoose.model("users", authSchema)