import Joi from 'joi'

export const CategoryValid = Joi.object({
    _id: Joi.string(),
    category_name: Joi.string().required().min(3).max(50),
    image: Joi.string().required(),
})
