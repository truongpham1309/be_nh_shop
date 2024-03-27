import cart from "../models/cart/cart.js";

export const addToCart = async (req, res) => {
    const { userID, productID, quantity } = req.body;
    try {
        let checkCart = await cart.findOne({ userID: userID });
        if (!checkCart) {
            checkCart = new cart({ userID, items: [] });
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
        const { userID } = req.params;

        const data = await cart.findOne({ userID: userID }).populate({
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
        const { userID, productID } = req.body;
        let cartOfUser = await cart.findOne({ userID });
        if (!cartOfUser) {
            return res.status(404).json({
                message: "Cart not found",
            })
        }
        cartOfUser.items = cartOfUser.items.
            filter(item => item.productID &&
                item.productID.toString() !== productID);
        cartOfUser.save();
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
        const { userID, productID, quantity } = req.body;

        const data = await cart.findOne({ userID });
        if (!data) {
            return res.status(404).json({
                message: "Cart not found",
            })
        }

        console.log(data);

        const product = data.items.find(item => item.productID.toString() === productID);
        console.log(product);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
            })
        }

        product.quantity = quantity;
        product.save();
        return res.status(200).json({ data });


    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            name: error.name || "Unknown error",
        })
    }
}


