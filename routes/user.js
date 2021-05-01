const express = require("express");
const router = express.Router();

// importing logic(method) from controller
const { signup } = require("../controllers/user");

router.post("/signup", signup);

module.exports = router;
