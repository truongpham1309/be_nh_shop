import jwt from 'jsonwebtoken';
import authModel from '../models/users/authModel.js';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_CODE } = process.env

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_CODE);
        if (!decoded) {
            return;
        }
        const user = await authModel.findById(decoded.id);
        if (!user) {
            return;
        }
        return user;
    } catch (error) {
        return;
    }
};