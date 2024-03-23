import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tags",
            required: true
        }
    ],
    feature: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("products", productSchema);
