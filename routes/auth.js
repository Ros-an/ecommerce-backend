const express = require("express");
const router = express.Router();

// importing logic(method) from controller
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
