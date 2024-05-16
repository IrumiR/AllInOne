import jwt from "jsonwebtoken";
import ServiceProvider from "../models/ServiceProviderSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {

    //get token from headers
    const authToken = req.headers.authorization

    //check whether the token exists or not
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: "No Token, authorization denied" })
    }

    try {
        console.log(authToken)
        next();
    } catch (error) { }
}