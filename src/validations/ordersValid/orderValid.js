import Joi from "joi";


export const orderValid = Joi.object({
    address: Joi.string().required().min(5),
    numberPhone: Joi.string().required().min(8),
    cartID: Joi.string().required(),
    paymentType: Joi.string().default("COD"),
    totalPrice: Joi.number().required(),
    status: Joi.string().default("pendding"),
});