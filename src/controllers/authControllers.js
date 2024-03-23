import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authModel from '../models/users/authModel.js';

dotenv.config();

const { SECRET_CODE } = process.env;

export const authLogin = async (req, res) => {
    try {
        const hasEmail = await authModel.findOne({ email: req.body.email });
        if (!hasEmail) {
            return res.status(401).json({
                message: "Email is not exist",
            })
        }

        const checkPassword = await bcrypt.compare(req.body.password, hasEmail.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Password is incorrect",
            })
        }

        const accsessToken = jwt.sign({ id: hasEmail._id }, SECRET_CODE, { expiresIn: "10d" });
        if (!accsessToken) {
            return res.status(401).json({
                message: "Create token failed",
            })
        }

        return res.status(200).json({
            message: "Login successful",
            token: accsessToken,
            user: {
                email: hasEmail.email,
                image: hasEmail.image,
                role: hasEmail.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}

export const authRegister = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        if (!hashPassword) {
            return res.status(402).json({
                message: "Hash password is incorrect!"
            })
        }

        req.body.password = undefined;
        const register = await authModel.create(
            {
                email: req.body.email,
                password: hashPassword,
                username: req.body.username
            });

        if (!register) {
            return res.status(403).json({
                message: "Register failed!",
            })
        }

        return res.status(200).json({
            message: "Register successfully",
            user: {
                email: register.email,
                username: register.username,
                role: register.role,
                image: register.image
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}