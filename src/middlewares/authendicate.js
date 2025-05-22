import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

export const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Không có token' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).populate('role');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Người dùng không tồn tại' });
      }

      if (!user.role || user.role.name !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: `Bạn cần quyền ${requiredRole} để truy cập`,
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc hết hạn' });
    }
  };
};
