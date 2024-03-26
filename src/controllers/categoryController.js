import categories from "../models/categories/categories.js";
import { CategoryValid } from "../validations/categoryValid/categories.js";

export const createCategory = async (req, res) => {
    try {
        const { error } = CategoryValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(421).json({
                message: errors,
                name: "Body is required",
            })
        }

        const checkCategory = await categories.findOne({ category_name: req.body.category_name });

        if (checkCategory) {
            return res.status(403).json({
                message: "Category does not exist",
            })
        }

        const data = await categories.create(req.body);
        if (!data) {
            return res.status(403).json({
                message: "Create category failed",
            })
        }

        return res.status(200).json({
            message: "Category created successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const data = await categories.find();

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { error } = CategoryValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(421).json({
                message: errors,
                name: "Body is required",
            })
        }

        const data = await categories.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });

        if (!data) {
            return res.status(403).json({
                message: "Update category failed",
            })
        }

        return res.json({
            message: "Category updated successfully",
            data,
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const getDetailCategory = async (req, res) => {
    try {
        const data = await categories.findById(req.params.idcate).populate({
            path: "products",
        });

        if (!data) {
            return res.status(404).json({
                message: 'Category not found',
            })
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const productsOfCategory = await categories.findById(req.params.id).populate({
            path: "products",
        });

        if (!productsOfCategory) {
            return res.status(404).json({
                message: "Category not found",
            })
        }

        if (productsOfCategory.products.length > 0) {
            for (const product of productsOfCategory.products) {
                await categories.updateOne(
                    { _id: "6602526d66293f81a61665e0" },
                    { $addToSet: { products: product._id } },
                    { new: true }
                );

                await product.updateOne(
                    { _id: product._id },
                    { $pull: { category: req.params.id } },
                    { new: true },
                );

                await product.updateOne(
                    { _id: product._id },
                    { $addToSet: { category: "6602526d66293f81a61665e0" } },
                    { new: true }
                )

            }
        }

        const data = await categories.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(403).json({
                message: "Delete category failed"
            })
        }

        return res.json({
            message: "Category deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            name: error.name,
        });
    }
}