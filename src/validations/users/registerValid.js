import Joi from "joi";

export const registerValid = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
})