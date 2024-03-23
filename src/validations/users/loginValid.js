import Joi from "joi";

export const loginValid = Joi.object({
    email: Joi.string().required().email().min(3),
    password: Joi.string().required().min(8),
})