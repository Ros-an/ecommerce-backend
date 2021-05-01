const express = require("express");
const router = express.Router();

// importing logic(method) from controller
const { greetings } = require("../controllers/user");

router.get("/", greetings);

module.exports = router;
