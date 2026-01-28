"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_results = void 0;
const { validationResult } = require("express-validator");
const validate_results = async (req, res, next) => {
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array().map((error) => ({
                    field: error.param,
                    message: error.msg,
                    value: error.value,
                    location: error.location,
                })),
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.validate_results = validate_results;
