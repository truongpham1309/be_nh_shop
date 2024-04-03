import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    numberPhone: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    totalPrice: {
        type: Number,
    },
    paymentType: {
        type: String,
        enum: ['COD', "ONLINE"],
        default: "COD"
    },
    status: {
        type: String,
        enum: ["cancelled", "pendding", "confirm", "shipped", "delivered"],
        default: "pendding"
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("orders", orderSchema);