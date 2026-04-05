import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing or malformed"
            });
        }

        const token = authHeader.split(" ")[1];


        if (token.split(".").length !== 3) {
            return res.status(401).json({
                message: "Malformed token structure"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        console.log("Decoded JWT:", decoded);

        next();

    } catch (error) {
        console.error("JWT error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};