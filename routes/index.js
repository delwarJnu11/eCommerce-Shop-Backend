const express = require("express");
const userRegisterController = require("../controller/userRegister");
const userLoginController = require("../controller/userLogin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogoutController = require("../controller/userLogout");
const getAllUsersController = require("../controller/getAllUsers");
const updateUserRoleController = require("../controller/updateUserRole");

const router = express.Router();

// endpoints
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogoutController);

//admin route
router.get("/users", authToken, getAllUsersController);
router.put("/user/:userId/update-role", authToken, updateUserRoleController);

module.exports = router;
