"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventChain = exports.createLoginChain = exports.createRegisterChain = void 0;
const express_validator_1 = require("express-validator");
const createRegisterChain = () => {
    return [
        (0, express_validator_1.body)("email")
            .isEmail()
            .withMessage("The field email must have email format!")
            .notEmpty()
            .withMessage("The field email is required!")
            .isString()
            .withMessage("Email must be a string")
            .isLength({ max: 30 })
            .withMessage("Max length of email field must be 30 chars"),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("The field password is required!")
            .isString()
            .withMessage("Password must be a string")
            .isLength({ max: 20 })
            .withMessage("Max length of password field must be 20 chars"),
        (0, express_validator_1.body)("passwordConfirmation").custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Passwords do not match!");
            }
            else {
                return true;
            }
        }),
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Name is required!")
            .isString()
            .withMessage("Name must be a string")
            .isLength({ max: 30 })
            .withMessage("The max length of your name must be 30 char"),
        (0, express_validator_1.body)("surname")
            .notEmpty()
            .withMessage("Surname is required!")
            .isString()
            .withMessage("Surname must be a string")
            .isLength({ max: 20 })
            .withMessage("The max length of your Surname must be 20 char"),
        (0, express_validator_1.body)("role")
            .optional()
            .isString()
            .withMessage("Role must be a string!")
            .isIn(["admin", "user"])
            .withMessage("Invalid role! Must be: admin or user")
            .default("user"),
    ];
};
exports.createRegisterChain = createRegisterChain;
const createLoginChain = () => {
    return [
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required!")
            .isString()
            .withMessage("Email must be a string")
            .isLength({ max: 40 })
            .withMessage("The max length of your email must be 40 char"),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("Password is required!")
            .isString()
            .withMessage("Password must be a string")
            .isLength({ max: 20 })
            .withMessage("The max length of your password must be 20 char"),
    ];
};
exports.createLoginChain = createLoginChain;
const createEventChain = () => {
    return [
        (0, express_validator_1.body)('title'),
        (0, express_validator_1.body)('description'),
        (0, express_validator_1.body)('start_date'),
        (0, express_validator_1.body)('ending_date'),
        (0, express_validator_1.body)('location'),
        (0, express_validator_1.body)('event_producer'),
        (0, express_validator_1.body)('state'),
        (0, express_validator_1.body)('capacity'),
    ];
};
exports.createEventChain = createEventChain;
