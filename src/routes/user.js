import express from 'express';
import { login, logout, register, verifyEmail } from '../controllers/userController.js';

const authRoute = express.Router();

// Register Route
authRoute.post('/register', register);

// Login Route
authRoute.post('/login', login);

// Logout Route
authRoute.post('/logout', logout);

authRoute.get('/verify-email/:token', verifyEmail);

// // Get Profile Route
// router.get('/profile', profileController.getProfile);

// // POST Profile Update Route
// router.post('/profile/update', profileController.updateProfile);

// // POST forgot Password Route
// router.post('/forgot-password', passwordResetController.forgotPassword);

// // POST Check-token Route
// router.post('/check-token', passwordResetController.checkToken);

// // POST Active Token Route
// router.post('/active-token', changePasswordController.activeToken);

// // POST Change Password Route
// router.post('/change-password', changePasswordController.changePassword);

// // Check token expiry route
// router.get('/check-token-expiry', authController.checkTokenExpiry);

// // Check if user is admin
// router.get('/check-admin-role', authController.checkAdminRole);

export default authRoute;
