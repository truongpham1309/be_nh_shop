import cart from "../models/cart/cart.js";
import order from "../models/orders/order.js";
import { verifyToken } from "../utils/vertifyToken.js";
import { orderValid } from "../validations/ordersValid/orderValid.js";


export const createOrderByUser = async (req, res) => {
    try {
        const { error } = orderValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(421).json({
                message: errors,
                name: "Body is required",
            })
        }

        const token = req.headers?.authorization?.split(" ")[1];
        const user = await verifyToken(token);

        if (!user) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        }

        const newOrder = { ...req.body, userID: user._id };
        const data = await order.create(newOrder);
        if (!data) {
            return res.status(404).json({
                message: "Create order failed!",
            })
        }

        await cart.findOneAndUpdate(
            { _id: data.cartID },
            { $set: { status: true } },
            { new: true }
        );

        return res.status(201).json({
            message: "Order created successfully",
            order: data
        })
    } catch (error) {
        return res.status(502).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}

export const getAllOrderByUserID = async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        const user = await verifyToken(token);

        const data = await order.find({ userID: user._id }).sort({ createdAt: -1 }).populate({
            path: "userID",
            select: ['-password', '-role']
        }).populate({
            path: "cartID",
            populate: {
                path: "items",
                populate: {
                    path: "productID",
                }
            }
        });

        return res.json(data);
    } catch (error) {
        return res.status(502).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}

export const updateStatusOrderByID = async (req, res) => {
    try {
        const statusOrder = ['cancelled', 'pendding', 'confirm', 'shipped', 'delivered'];
        const token = req.headers?.authorization?.split(' ')[1];
        const user = await verifyToken(token);
        if (!user) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        };

        const data = await order.findOne({
            userID: user._id,
            _id: req.params.id
        });

        if (!data) {
            return res.status(403).json({
                message: "Đơn hàng không hợp lệ!",
            })
        }

        if (data.status === statusOrder[statusOrder.length - 1]) {
            return res.status(403).json({
                message: "Đơn hàng đã được giao, không thể cập nhật trạng thái!",
            })
        }

        const index = statusOrder.findIndex(i => i === data.status);

        if (index < 0) {
            return res.status(403).json({
                message: "Cập nhật thất bại, trạng thái không tồn tại!",
                status: data.status,
            })
        }

        const updateOrder = await order.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { status: statusOrder[index + 1] || "delivered" } },
            { new: true }
        );

        if (!updateOrder) {
            return res.status(403).json({
                message: "Cập nhật thất bại!",
            })
        }

        return res.status(200).json({
            message: "Cập nhật trạng thái thành công!",
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}

export const cancelOrderByID = async (req, res) => {
    try {
        const statusOrder = ['cancelled', 'pendding', 'confirm', 'shipped', 'delivered'];
        const token = req.headers?.authorization?.split(' ')[1];
        const user = await verifyToken(token);

        if (!user) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        };

        const dataOrder = await order.findOne({ userID: user._id, _id: req.params.id });

        if (!dataOrder) {
            return res.status(404).json({
                message: "Đơn hàng không tồn tại!",
            })
        }

        if (!(dataOrder.status === "pendding")) {
            return res.status(403).json({
                message: "Bạn không thể hủy đơn hàng này!",
            })
        }

        dataOrder.status = "cancelled";
        await dataOrder.save();

        return res.status(200).json({
            message: "Bạn đã hủy đơn hàng!",
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}

export const getAllOrder = async (req, res) => {
    try {
        const data = await order.find().populate({
            path: "userID",
            select: ['-password', '-role']
        }).populate({
            path: "cartID",
            populate: {
                path: "items",
                populate: {
                    path: "productID",
                }
            }
        });;
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}

export const getDetailOrder = async (req, res) => {
    try {
        const data = await order.findById(req.params.id).populate({
            path: "userID",
            select: ['-password', '-role']
        }).populate({
            path: "cartID",
            populate: {
                path: "items",
                populate: {
                    path: "productID",
                }
            }
        });

        if (!data) {
            return res.status(404).json({
                message: "Đơn hàng không hợp lệ!",
            })
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}