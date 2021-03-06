const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { create } = require("../controllers/product");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.param("userId", userById);
module.exports = router;
