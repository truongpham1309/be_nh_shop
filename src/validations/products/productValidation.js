import Joi from "joi";

export const productValidations = Joi.object({
    product_name: Joi.string().required().min(3),
    price: Joi.number().required().min(0),
    category: Joi.string().required().min(3),
    tags: Joi.array().string().required().min(1),
    image: Joi.array().required().min(5),
    description: Joi.string(),
})