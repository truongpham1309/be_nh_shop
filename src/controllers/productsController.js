import categories from "../models/categories/categories.js";
import products from "../models/products/products.js";

//  [GET] /api/products
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipProduct = (page - 1) * limit;
        const data = await products.find().skip(skipProduct).limit(limit).populate({
            path: "category",
            select: ['category_name', 'image']
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error"
        });
    }
}

//  [GET] /api/products/:id
export const getDetailProduct = async (req, res) => {
    try {
        const data = await products.findById(req.params.id).populate({
            path: 'category',
            select: ["category_name", "image"]
        });

        if (!data) {
            return res.status(404).json({
                message: "Products not found"
            })
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}

//  [POST] /api/products
export const createProduct = async (req, res) => {
    try {
        const checkProduct = await products.findOne({ product_name: req.body.product_name });
        if (checkProduct) {
            return res.status(421).json({
                message: "Product is already"
            })
        }

        const product = await products.create(req.body);
        if (!product) {
            return res.status(400).json({
                message: "Create Product failed!",
            })
        }

        const checkCategory = await categories.findById(product.category);

        if (!checkCategory) {
            // add items products => category
            await categories.findByIdAndUpdate("6602526d66293f81a61665e0", {
                $addToSet: {
                    products: product._id
                }
            })
        }

        await categories.findByIdAndUpdate(product.category, {
            $addToSet: {
                products: product._id
            }
        })

        return res.json({
            message: "Product created",
            product,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        });
    }
}

//  [PUT] /api/products/:id
export const updateProductByID = async (req, res) => {
    try {
        const { category: currentCategory } = await products.findById(req.params.id).select("category");
        if (currentCategory !== req.body.category) {
            await categories.updateOne(
                { _id: currentCategory },
                { $pull: { products: req.params.id } },
                { new: true }
            )

            await categories.updateOne(
                { _id: req.body.category },
                { $addToSet: { products: req.params.id } },
                { new: true }
            )
        }
        const product = await products.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });
        if (!product) {
            return res.status(400).json({
                message: "Update Product failed!",
            })
        }

        return res.json({
            message: "Product updated",
            product,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        });
    }
}

//  [DELETE] /api/products/:id
export const deleteProductByID = async (req, res) => {
    try {
        const data = await products.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Products not found"
            })
        }

        await categories.updateOne(
            { _id: data.category._id },
            { $pull: { products: data._id } },
            { new: true }
        )

        return res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error"
        });
    }
}

//  [GET] /api/products/category/:idcate
export const getAllProductsByCategory = async (req, res) => {
    try {
        const { page } = req.query || 1;
        const { limit } = req.query || 4;
        const skipProduct = (page - 1) * limit;
        const data = await categories.findById(req.params.idcate).populate({
            path: "products",
            populate: {
                path: "category",
                select: ["category_name", "image", '-_id'],
            },
            options: {
                skip: skipProduct,
                limit: limit
            },
        });

        if (!data) {
            return res.status(404).json({
                message: "Categories not found"
            })
        }

        return res.json(data.products)
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error"
        });
    }
}