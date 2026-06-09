import jwt from "jsonwebtoken";
import { UserModel } from "../Models/user.model.js";


const isAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No any user logged In",
        })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user = await UserModel.findById(decodedToken?.userId).select("-password")

    if (!user) {
        return res.status(401).json({
            successand: false,
            message: "Invalid Access Token",
        })
    }

    req.user = user
    next()
}

export { isAuth }