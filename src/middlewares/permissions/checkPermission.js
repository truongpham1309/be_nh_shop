import { verifyToken } from "../../utils/vertifyToken.js";


export const checkPermissionAdmin = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        if(!token){
            return res.status(403).json({
                message: "Bạn chưa đăng nhập!",
            })
        }

        const checkAdmin = await verifyToken(token);

        if(checkAdmin?.role !== "admin"){
            return res.status(400).json({
                message: "Bạn không có quyền làm việc này!",
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message || "INTERNAL ERROR",
            name: error.name || "Permission denied",
        })
    }
}