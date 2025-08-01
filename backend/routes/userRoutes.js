const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
