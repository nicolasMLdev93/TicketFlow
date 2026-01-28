"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_token = void 0;
const jwt = require("jsonwebtoken");
const validate_token = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                error: "Token is required for authentication.",
                success: false,
            });
            return;
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            res.status(401).json({
                error: "Invalid format; must be: Bearer <token>",
                success: false,
            });
            return;
        }
        const token = parts[1];
        if (!process.env.JWT_SECRET) {
            res.status(500).json({
                error: "Error de configuración del servidor",
                success: false,
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                message: "Expired token",
                success: false,
                error: error,
            });
            return;
        }
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({
                error: "Invalid token",
                success: false,
            });
            return;
        }
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error,
        });
    }
};
exports.validate_token = validate_token;
