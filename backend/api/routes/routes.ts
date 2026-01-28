const express = require("express");
const router = express.Router();

// Imports //
// Chain validators
const {
  createRegisterChain,
  createLoginChain,
  createEventChain,
} = require("../middlewares/chain_val");
const { validate_results } = require("../middlewares/result_val");
// Token validator
const { validate_token } = require("../middlewares/token_val");
const {
  validate_existanceUser_register,
  validate_existanceUser_login,
  validate_existanceEvent,
} = require("../middlewares/existance_val");
// Controllers
const {
  register_user,
  login_user,
  create_event,  get_events,
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
router.get("/events",validate_token, get_events);
// Filter events by name
router.get('/event_name')

module.exports = router;
export {};
