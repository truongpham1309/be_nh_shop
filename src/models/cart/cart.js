import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    items: [
        cartItemSchema
    ],
    status: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true,
})

export default mongoose.model("carts", cartSchema);