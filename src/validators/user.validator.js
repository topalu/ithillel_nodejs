
import Joi from "joi"

export function createUserValidator(req, res, next) {

    const userSchema = Joi.object({
        user: Joi.object({
            name: Joi.string().min(2).max(10).required(),
            age: Joi.number().min(18).max(100).required(),
            email: Joi.string().email().required(),
            skills: Joi.array().items(Joi.string().max(10)),
            phone: Joi.string().pattern(/^\+380\d{9}$/).required(),
            item: Joi.custom(() => {
                
                throw new Error("Item error")
            }).required()
        })
    })
    
    const {error} = userSchema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        return res.status(400).json({
            message: "Validation errors",
            details: error.details.map(itm => itm.message)
        })
    }

    next()
}