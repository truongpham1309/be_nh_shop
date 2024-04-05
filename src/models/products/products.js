import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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
            type: String,
            required: true,
        }
    ],
    feature: {
        type: Boolean,
        default: false,
    },
    gallery: [
        {
            type: String,
            default: "https://res.cloudinary.com/dhfryzrce/image/upload/v1710856000/react_image/vbxldpakol3z1wz2z7dg.png"
        }
    ],
    countStocks: {
        type: Number,
        default: 100,
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
    },
    isDelete: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
});

productSchema.plugin(paginate);

export default mongoose.model("products", productSchema);
