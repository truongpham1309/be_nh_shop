import cart from "../models/cart/cart.js";
import { verifyToken } from "../utils/vertifyToken.js";

export const addToCart = async (req, res) => {
    const { productID, quantity } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(404).json({
            message: "Bạn chưa đăng nhập!",
        })
    }
    try {
        const user = await verifyToken(token);
        let checkCart = await cart.findOne({ userID: user._id });
        if (!checkCart) {
            checkCart = new cart({ userID: user._id, items: [] });
        }
        const existProductIndex = checkCart.items.findIndex(item => item.productID.toString() === productID);
        if (existProductIndex !== -1) {
            checkCart.items[existProductIndex].quantity += quantity;
        }
        else {
            checkCart.items.push({
                productID: productID,
                quantity: quantity
            });
        }
        await checkCart.save();
        return res.status(200).json({
            checkCart
        })
    } catch (error) {
        // trả về client lỗi
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}

export const getCartByUserID = async (req, res) => {
    try {
        // const { userID } = req.params;
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        }
        const user = await verifyToken(token);
        const data = await cart.findOne({ userID: user._id }).populate({
            path: "userID",
            select: ['-password', '-role']
        }).populate({
            path: "items",
            populate: {
                path: 'productID',
            }
        });

        if (!data) {
            return res.status(404).json({
                message: "Bạn chưa có giỏ hàng",
            })
        }

        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}

export const getAllCart = async (req, res) => {
    try {
        const data = await cart.find().populate("userID").populate({
            path: "items",
            populate: {
                path: 'productID',
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Chưa có giỏ hàng nào",
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}

export const removeCartByUserID = async (req, res) => {
    try {
        const { productID } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        }

        const user = await verifyToken(token);
        let cartOfUser = await cart.findOne({ userID: user._id });
        if (!cartOfUser) {
            return res.status(404).json({
                message: "Cart not found",
            })
        }
        cartOfUser.items = cartOfUser.items.
            filter(item => item.productID &&
                item.productID.toString() !== productID);
        await cartOfUser.save();
        return res.status(200).json({
            cartOfUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}

export const updateCartByUserID = async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({
                message: "Bạn chưa đăng nhập!",
            })
        }
        const user = await verifyToken(token);

        const data = await cart.findOne({ userID: user._id });
        if (!data) {
            return res.status(404).json({
                message: "Cart not found",
            })
        }
        const product = data.items.find(item => item.productID.toString() === productID);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
            })
        }

        product.quantity = quantity;
        await product.save();
        return res.status(200).json({ data });


    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}


