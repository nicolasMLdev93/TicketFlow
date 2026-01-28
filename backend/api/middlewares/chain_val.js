"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFindTicket_typeChain = exports.createTicket_typeChain = exports.createFindEventChain = exports.createEventChain = exports.createLoginChain = exports.createRegisterChain = void 0;
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
        (0, express_validator_1.body)("title")
            .notEmpty()
            .withMessage("Title is required!")
            .isString()
            .withMessage("Title must be a string"),
        (0, express_validator_1.body)("description")
            .notEmpty()
            .withMessage("Description is required!")
            .isString()
            .withMessage("Email must be a string")
            .isLength({ max: 200 })
            .withMessage("The max length of the description must be 200 char"),
        (0, express_validator_1.body)("start_date")
            .notEmpty()
            .withMessage("Start_date is required!")
            .isString()
            .withMessage("Start_date must be a string"),
        (0, express_validator_1.body)("ending_date")
            .notEmpty()
            .withMessage("Ending_date is required!")
            .isString()
            .withMessage("Ending_date must be a string"),
        (0, express_validator_1.body)("location")
            .notEmpty()
            .withMessage("Location is required!")
            .isString()
            .withMessage("Location must be a string"),
        (0, express_validator_1.body)("event_producer")
            .notEmpty()
            .withMessage("Event_producer is required!")
            .isString()
            .withMessage("Event_producer must be a string"),
        (0, express_validator_1.body)("state")
            .notEmpty()
            .withMessage("State is required!")
            .isString()
            .withMessage("State must be a string"),
        (0, express_validator_1.body)("capacity")
            .notEmpty()
            .withMessage("Capacity is required!")
            .isNumeric()
            .withMessage("Capacity must be an integer"),
    ];
};
exports.createEventChain = createEventChain;
const createFindEventChain = () => {
    return [
        (0, express_validator_1.param)("title")
            .notEmpty()
            .withMessage("Title is required!")
            .isString()
            .withMessage("Title must be a string"),
    ];
};
exports.createFindEventChain = createFindEventChain;
const createTicket_typeChain = () => {
    return [
        (0, express_validator_1.body)("event_id")
            .notEmpty()
            .withMessage("Event_id is required!")
            .isNumeric()
            .withMessage("Event_id must be an integer"),
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Name is required!")
            .isString()
            .withMessage("Name must be a string")
            .isIn(["vip", "common"])
            .withMessage("Invalid name! Must be: vip or common"),
        (0, express_validator_1.body)("price")
            .notEmpty()
            .withMessage("Price is required!")
            .isFloat({ min: 0 })
            .withMessage("Price must be a positive number"),
        (0, express_validator_1.body)("description")
            .optional()
            .isString()
            .withMessage("Description must be a string")
            .isLength({ max: 200 })
            .withMessage("Description cannot exceed 200 characters"),
    ];
};
exports.createTicket_typeChain = createTicket_typeChain;
const createFindTicket_typeChain = () => {
    return [
        (0, express_validator_1.param)("event_id")
            .notEmpty()
            .withMessage("Event_id is required!")
            .isNumeric()
            .withMessage("Event_id must be a string"),
    ];
};
exports.createFindTicket_typeChain = createFindTicket_typeChain;
