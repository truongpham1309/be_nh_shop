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

        const data = await order.find({ userID: user._id }).populate({
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

export const updateStatusOrderByID = async () => {
    try {
        const { status } = req.body;
        const statusOrder = ['cancelled', 'pendding', 'confirm', 'shipped', 'delivered'];
        console.log(statusOrder.length);
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

        const index = statusOrder.findIndex(i => i === status);

        if (index > 0) {
            return res.status(403).json({
                message: "Cập nhật thất bại, trạng thái không tồn tại!"
            })
        }

        if (status === statusOrder[statusOrder.length - 1]) {
            return res.status(403).json({
                message: "Đơn hàng đã được giao, không thể cập nhật trạng thái",
            })
        }

        const updateOrder = await order.findOneAndUpdate(
            { _id: request.params.id },
            { $set: { status: statusOrder[index + 1] || "delivered" } },
            { new: true }
        );

        if (!updateOrder) {
            return res.status(403).json({
                message: "Cập nhật thất bại!",
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "INTERNAL ERROR",
        })
    }
}