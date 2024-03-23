import products from "../models/products/products.js";


export const getAllProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await products.find();

        return res.status(200).json({products: data});
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}