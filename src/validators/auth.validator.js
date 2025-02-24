
import Joi from "joi"

export function registrationValidator(req, res, next) {

    const userSchema = Joi.object({
        username: Joi.string().min(1).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    
    const {error} = userSchema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        res.render("registration", {
            title: "Registration Page",
            error: JSON.stringify(error.details.map(itm => itm.message))
        })
    }

    next()
}

export function loginValidator(req, res, next) {

    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    
    const {error} = userSchema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    })

    if (error) {
        res.render("login", {
            title: "Login Page",
            error: JSON.stringify(error.details.map(itm => itm.message))
        })
    }

    next()
}