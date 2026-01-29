"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_existanceUser = exports.validate_existanceTicket_type_params = exports.validate_existanceTicket_type = exports.validate_existanceEvent_params = exports.validate_existanceEvent = exports.validate_existanceUser_login = exports.validate_existanceUser_register = void 0;
const { users, events } = require("../../models");
const { Op } = require("sequelize");
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
        const user_result = await users.findAll({ where: { email: email } });
        if (user_result.length === 0) {
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
const validate_existanceEvent = async (req, res, next) => {
    const { title, location, start_date } = req.body;
    try {
        const existingEvent = await events.findOne({
            where: {
                title: title,
                location: location,
                start_date: start_date,
            },
        });
        if (existingEvent) {
            res.status(400).json({
                error: `The event "${title}" already exists in ${location} at ${start_date}`,
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
exports.validate_existanceEvent = validate_existanceEvent;
const validate_existanceEvent_params = async (req, res, next) => {
    const { title } = req.params;
    try {
        const existingEvent = await events.findOne({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                },
            },
        });
        if (!existingEvent) {
            res.status(400).json({
                error: `The aren´t events like "${title}"`,
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
exports.validate_existanceEvent_params = validate_existanceEvent_params;
const validate_existanceTicket_type = async (req, res, next) => {
    const { event_id } = req.body;
    try {
        const existingEvent = await events.findOne({
            where: {
                id: event_id
            },
        });
        if (!existingEvent) {
            res.status(400).json({
                error: `The event with id ${event_id} not  exists!`,
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
exports.validate_existanceTicket_type = validate_existanceTicket_type;
const validate_existanceTicket_type_params = async (req, res, next) => {
    const { event_id } = req.params;
    try {
        const existingEvent = await events.findOne({
            where: {
                id: event_id
            },
        });
        if (!existingEvent) {
            res.status(400).json({
                error: `The event with id ${event_id} not  exists!`,
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
exports.validate_existanceTicket_type_params = validate_existanceTicket_type_params;
const validate_existanceUser = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const user_result = await users.findOne({
            where: {
                id: user_id
            },
        });
        if (!user_result) {
            res.status(400).json({
                error: `The user with id ${user_id} not  exists!`,
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
exports.validate_existanceUser = validate_existanceUser;
