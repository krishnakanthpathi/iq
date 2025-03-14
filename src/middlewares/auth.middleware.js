import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";

import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    } else {
        token = null;
    }
    console.log("Token" , token);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    try {
        let decoded = jwt.verify(token, jwt_secret);
        let user = await User.findById(decoded.id);
        if (user) {
            req.user = user;
            if (user.isAdmin) {
                return next();
            }
        } 

        return res.status(401).json({
            message: "Unauthorized access"
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
}
