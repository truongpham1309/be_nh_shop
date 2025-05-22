import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/email.js';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import Role from '../models/Role.js';
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
const SERVER_URL = process.env.SERVER_URL;

export const register = async (req, res) => {
    try {
        const { full_name, email, password, phone, birth_date, gender } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'Email đã được sử dụng' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = uuidv4();
        const role = await Role.findOne({ name: 'Client' });

        const user = await User.create({
            full_name,
            email,
            password: hashedPassword,
            phone,
            birth_date,
            gender,
            role_id: role?._id,
            avatar: 'https://res.cloudinary.com/cinemasway/image/upload/v1715782888/default-avatar.png',
            status: 'Chưa kích hoạt',
            email_verification_token: token
        });

        const verifyUrl = `${SERVER_URL}/auth/verify-email/${token}`;
        await sendVerificationEmail(user, verifyUrl);

        res.status(201).json({ success: true, data: user, message: 'Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password').populate('role_id');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
        }

        if (user.status !== 'Kích hoạt') {
            return res.status(403).json({ success: false, message: 'Tài khoản chưa được kích hoạt' });
        }

        const token = jwt.sign({ id: user._id, role: user.role_id.name }, JWT_SECRET, { expiresIn: '60m' });

        res.status(200).json({
            success: true,
            data: user,
            token,
            message: 'Đăng nhập thành công'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        // Client tự xóa token ở phía frontend. Hoặc dùng blacklist nếu cần bảo mật cao hơn.
        res.status(200).json({ success: true, message: 'Đăng xuất thành công' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// export const verifyEmail = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const user = await User.findOne({ email_verification_token: token });

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn' });
//         }

//         user.status = 'Kích hoạt';
//         user.email_verification_token = null;
//         await user.save();

//         res.redirect(`${CLIENT_URL}/login`);
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

export const checkAdmin = async (req, res) => {
    try {
        const user = req.user; // được gắn từ middleware verifyToken
        if (user.role === 'Admin') {
            return res.status(200).json({ success: true, message: 'User là admin' });
        }
        res.status(403).json({ success: false, message: 'User không phải admin' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) return res.status(400).json({ success: false, message: "Token không hợp lệ" });

        const user = await User.findOne({ email_verification_token: token });
        if (!user) return res.status(404).json({ success: false, message: "Token không tồn tại hoặc đã được sử dụng" });

        user.status = "Kích hoạt"
        await user.save();

        return res.status(200).json({ success: true, message: "Kích hoạt tài khoản thành công" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
