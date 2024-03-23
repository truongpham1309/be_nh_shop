import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        }
    ]

}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model("categories", CategorySchema)