import { productValidations } from "../../validations/products/productValidation.js";

export const checkBodyRequestProducts = async (req, res, next) => {
    try {
        const { body } = req;
        const { error } = productValidations.validate(body);

        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(421).json({
                message: errors,
                name: "Body validation error",
            })
        }

        

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}