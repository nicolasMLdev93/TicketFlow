"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_userTickets = exports.create_order = exports.get_event = exports.get_ticket_types = exports.create_ticketType = exports.get_eventByName = exports.get_events = exports.create_event = exports.login_user = exports.register_user = void 0;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { users, events, ticket_types, orders, tickets, } = require("../../models");
const { Op } = require("sequelize");
// Generate QR for each ticket
const geterateQR = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let qr = "";
    for (let j = 0; j < 20; j++) {
        qr += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return qr;
};
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
// Get all events by title
const get_eventByName = async (req, res) => {
    const { title } = req.params;
    try {
        const event_result = await events.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                },
            },
        });
        res.status(200).json({ events: event_result, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_eventByName = get_eventByName;
// Create ticket_type
const create_ticketType = async (req, res) => {
    const { event_id, name, price, description } = req.body;
    try {
        const existingEvent = await events.findOne({
            where: {
                id: event_id,
            },
        });
        const event_capacity = existingEvent.capacity;
        const ticket_typeAvailable = name === "vip"
            ? Math.round(event_capacity * 0.25)
            : Math.round(event_capacity * 0.75);
        await ticket_types.create({
            event_id: event_id,
            name: name,
            price: price,
            available_quantity: ticket_typeAvailable,
            description: description,
            sale_start_date: new Date().toISOString().replace("T", " ").slice(0, 16),
            sale_end_date: existingEvent.start_date,
        });
        res.status(201).json({ message: "Ticket type created!", success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.create_ticketType = create_ticketType;
// Get all Ticket_types by event_id
const get_ticket_types = async (req, res) => {
    const { event_id } = req.params;
    try {
        const ticket_results = await ticket_types.findAll({
            where: {
                event_id: event_id,
                available_quantity: { [Op.gt]: 0 },
            },
        });
        if (ticket_results.length === 0) {
            res.status(200).json({
                message: "This event don´t have ticket_types registered yet!",
                success: true,
            });
        }
        else {
            res.status(200).json({ ticket_types: ticket_results, success: true });
        }
        res.status(200).json({ ticket_types: ticket_results, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_ticket_types = get_ticket_types;
// Get event by title
const get_event = async (req, res) => {
    const { title } = req.params;
    try {
        const event_result = await events.findOne({
            where: {
                title: title,
            },
        });
        res.status(200).json({ events: event_result, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_event = get_event;
// Create new order
const create_order = async (req, res) => {
    const { user_id, total, vip_count, common_count, event_id } = req.body;
    try {
        let date = new Date().toISOString().replace("T", " ").slice(0, 16);
        const new_order = await orders.create({
            user_id: user_id,
            purchase_date: date,
            total: total + total * 0.1,
            state: "confirmed",
            payment_method: "card",
        });
        const order_id = new_order.id;
        const vip_t = await ticket_types.findOne({
            where: {
                event_id: event_id,
                name: "vip",
            },
        });
        const common_t = await ticket_types.findOne({
            where: {
                event_id: event_id,
                name: "common",
            },
        });
        for (let i = 0; i < vip_count; i++) {
            await tickets.create({
                order_id: order_id,
                ticket_type_id: vip_t.id,
                issue_date: date,
                state: "confirmed",
                price: vip_t.price,
                qr_code: geterateQR(),
            });
        }
        for (let i = 0; i < common_count; i++) {
            await tickets.create({
                order_id: order_id,
                ticket_type_id: common_t.id,
                issue_date: date,
                state: "confirmed",
                price: common_t.price,
                qr_code: geterateQR(),
            });
        }
        await vip_t.decrement("available_quantity", { by: vip_count });
        await common_t.decrement("available_quantity", { by: common_count });
        res.status(201).json({ message: "New order created!", success: true });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error,
        });
    }
};
exports.create_order = create_order;
// Get tickets by user
const get_userTickets = async (req, res) => {
    const { user_id } = req.params;
    try {
        const order_result = await orders.findAll({
            where: {
                user_id: user_id,
            },
        });
        const ids = order_result.map((order) => order.id);
        const ticket_results = await tickets.findAll({
            where: {
                order_id: { [Op.in]: ids },
            },
        });
        res.status(200).json({ tickets: ticket_results, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_userTickets = get_userTickets;
