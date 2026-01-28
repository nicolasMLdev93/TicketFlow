"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_events = exports.create_event = exports.login_user = exports.register_user = void 0;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { users, events } = require("../../models");
// Register new user
const register_user = async (req, res) => {
    const { email, password, name, surname, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await users.create({
            email: email,
            password: hash,
            name: name,
            surname: surname,
            isActive: true,
            role: role,
        });
        res.status(201).json({ message: "User created!", success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.register_user = register_user;
// Login user
const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user_result = await users.findOne({ where: { email: email } });
        const checked_password = await bcrypt.compareSync(password, user_result.password);
        if (!checked_password) {
            res.status(400).json({
                error: `Your password is incorrect, try again!`,
                success: false,
            });
            return;
        }
        else {
            const token = jwt.sign({
                data: user_result.id,
            }, process.env.JWT_SECRET);
            res.status(200).json({
                message: `Welcome ${user_result.name}`,
                token: token,
                success: true,
                user: {
                    id: user_result.id,
                    email: user_result.email,
                    role: user_result.role,
                },
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.login_user = login_user;
// Create new Event
const create_event = async (req, res) => {
    const { title, description, start_date, ending_date, location, event_producer, state, capacity, } = req.body;
    try {
        await events.create({
            title: title,
            description: description,
            start_date: start_date,
            ending_date: ending_date,
            location: location,
            event_producer: event_producer,
            state: state,
            capacity: capacity,
        });
        res.status(201).json({ message: "Event created!", success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.create_event = create_event;
// Get all Events
const get_events = async (req, res) => {
    try {
        const event_result = await events.findAll();
        res.status(200).json({ events: event_result, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_events = get_events;
