import AppError from "../utils/errors/AppError.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
import { Config } from "../config/server-config.js";

const isAuth = async function (req, res, next) {
    try {

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
            console.log(req);
          console.log("token ", token);
        if (!token) {
            throw new AppError("token is required", 401);
        }

        const decodedToken = jwt.verify(token, Config.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken.id).select("-password");
          
        if (!user) {
            throw new AppError("Invalid access token", 401);
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Invalid AccessToken",
            success: false,
            error: error
        })
    }
}

export {isAuth};