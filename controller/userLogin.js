const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("please provide email");
    if (!password) throw new Error("please provide password");
    const user = await User.findOne({ email });
    if (!user) throw new Error("user not found!");

    const checkPassword = await bcrypt.compareSync(password, user.password);
    console.log(checkPassword);
    if (checkPassword) {
    } else {
      throw new Error("please provide valid password!");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = userLoginController;
