import authModel from "../../models/users/authModel.js";
import { loginValid } from "../../validations/users/loginValid.js";
import { registerValid } from "../../validations/users/registerValid.js"


export const checkBodyRequestRegister = async (req, res, next) => {
    try {
        const { error } = registerValid.validate(req.body);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(401).json({
                message: errors,
                name: "Body is required",
            })
        }

        const hasEmail = await authModel.findOne({ email: req.body.email });
        if (hasEmail) {
            return res.status(403).json({
                message: 'Email already',
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


export const checkBodyRequestLogin = async (req, res, next) => {
    try {
        const { error } = loginValid.validate(req.body);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(401).json({
                message: errors,
                name: "Body is required",
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