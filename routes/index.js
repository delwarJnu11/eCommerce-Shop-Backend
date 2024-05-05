const express = require("express");
const userRegisterController = require("../controller/userRegister");
const userLoginController = require("../controller/userLogin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");

const router = express.Router();

// endpoints
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);

module.exports = router;
