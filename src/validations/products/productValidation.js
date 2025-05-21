import Joi from "joi";

export const productValidations = Joi.object({
    _id: Joi.string(),
    product_name: Joi.string().required().min(3),
    price: Joi.number().required().min(0),
    category: Joi.string().required().min(3),
    countStocks: Joi.number().required().min(0),
    gallery: Joi.array().required().min(1),
    tags: Joi.array().required().min(1),
    image: Joi.string().required().min(5),
    feature: Joi.boolean().default(false),
    description: Joi.string(),
});