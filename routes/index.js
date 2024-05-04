const express = require("express");
const userRegisterController = require("../controller/userRegister");
const userLoginController = require("../controller/userLogin");

const router = express.Router();

// endpoints
router.post("/register", userRegisterController);
router.post("/login", userLoginController);

module.exports = router;
