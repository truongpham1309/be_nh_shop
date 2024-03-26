import Joi from 'joi'

export const CategoryValid = Joi.object({
    category_name: Joi.string().required().min(3).max(50),
    image: Joi.string().required(),
})
