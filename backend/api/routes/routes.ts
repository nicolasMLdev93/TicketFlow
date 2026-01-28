const express = require("express");
const router = express.Router();

// Imports //
// Chain validators
const {
  createRegisterChain,
  createLoginChain,
  createEventChain,
  createFindEventChain,
  createTicket_typeChain,
  createFindTicket_typeChain,
} = require("../middlewares/chain_val");
const { validate_results } = require("../middlewares/result_val");
// Token validator
const { validate_token } = require("../middlewares/token_val");
const {
  validate_existanceUser_register,
  validate_existanceUser_login,
  validate_existanceEvent,
  validate_existanceEvent_params,
  validate_existanceTicket_type,
  validate_existanceTicket_type_params,
} = require("../middlewares/existance_val");
// Controllers
const {
  register_user,
  login_user,
  create_event,
  get_events,
  get_eventByName,
  create_ticketType,get_ticket_types
} = require("../controllers/controllers");
// Routes //
// Register new user on database
router.post(
  "/register",
  createRegisterChain(),
  validate_results,
  validate_existanceUser_register,
  register_user,
);
// Login user
router.post(
  "/login",
  createLoginChain(),
  validate_results,
  validate_existanceUser_login,
  login_user,
);
// Create Event
router.post(
  "/create_event",
  createEventChain(),
  validate_results,
  validate_token,
  validate_existanceEvent,
  create_event,
);
// Get all events
router.get("/events", validate_token, get_events);
// Filter events by name
router.get(
  "/event_name/:title",
  createFindEventChain(),
  validate_results,
  validate_token,
  validate_existanceEvent_params,
  get_eventByName,
);
// Create ticket_types
router.post(
  "/ticket_type",
  createTicket_typeChain(),
  validate_results,
  validate_token,
  validate_existanceTicket_type,
  create_ticketType,
);
// Get ticket_types by event_id
router.get(
  "/ticket_type/:event_id",
  createFindTicket_typeChain(),
  validate_results,
  validate_token,
  validate_existanceTicket_type_params,get_ticket_types
);
// Create order

// Buy ticket

// Get tickets by user



module.exports = router;
export {};
