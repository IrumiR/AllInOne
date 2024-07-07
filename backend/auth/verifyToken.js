import jwt from "jsonwebtoken";
import ServiceProvider from "../models/ServiceProviderSchema.js";
import User from "../models/UserSchema.js";
import SuperAdmin from "../models/SuperAdminSchema.js"

export const authenticate = async (req, res, next) => {
    //get token from headers
    const authToken = req.headers.authorization;

    //check whether the token exists or not
    if (!authToken || !authToken.startsWith("Bearer")) {
        return res
            .status(401)
            .json({ success: false, message: "No Token, authorization denied" });
    }

    try {
        const token = authToken.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.user.id;
        req.role = decoded.user.role;
        req.decoded = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" });
        }

        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export const allowOnly = roles => async (req, res, next) => {

    const userId = req.userId
    const user = await User.findById(userId);

    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You`re not authorized" })
    }

    next();
}
