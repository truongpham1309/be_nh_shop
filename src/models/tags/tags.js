import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag_name: {
        type: String,
        required: true,
        unique: true,
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

export default mongoose.model("tags", tagSchema);