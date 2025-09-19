import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function optionalAuth(req, res, next) {
    try {
        // Try cookie first (your Google auth sets cookie "accessToken")
        let token = req.cookies?.accessToken;

        // Fallback to Authorization header (Bearer ...)
        if (!token) {
            const auth = req.headers.authorization;
            if (auth && auth.startsWith("Bearer ")) token = auth.split(" ")[1];
        }

        if (!token) return next();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.id || decoded?._id || decoded?.userId;

        if (!userId) return next();

        const user = await User.findById(userId).select("-password");
        if (user) req.user = user;
        return next();
    } catch (err) {
        // ignore invalid/expired token and continue as unauthenticated
        return next();
    }
}