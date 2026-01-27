const express = require("express");
const router = express.Router();

// Imports
const { createRegisterChain } = require("../middlewares/chain_val");

// Register new user on database
router.post("/register", createRegisterChain);

module.exports = router;
export {};
