import jwt from 'jsonwebtoken';
import authModel from '../models/users/authModel.js';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_CODE } = process.env

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_CODE);
        if(!decoded){
            return res.status(404).json({
                message: "Tài khoản của bạn đã hết hạn, vui lòng đăng nhập lại!",
            })
        }
        const user = await authModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }
        return user;
    } catch (error) {
        return res.status(500).json({
            name: "VERIFY TOKEN ERROR!",
            message: error.message || "Server error!",
        });
    }
};