"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_existanceUser_login = exports.validate_existanceUser_register = void 0;
const { users } = require("../../models");
const validate_existanceUser_register = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user_result = await users.findOne({ where: { email: email } });
        if (user_result) {
            res.status(400).json({
                error: `The user with the email ${email} already exists!`,
                success: false,
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
exports.validate_existanceUser_register = validate_existanceUser_register;
const validate_existanceUser_login = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user_result = await users.findOne({ where: { email: email } });
        if (!user_result) {
            res.status(404).json({
                error: `User with the email ${email} not exists!`,
                success: false,
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
exports.validate_existanceUser_login = validate_existanceUser_login;
