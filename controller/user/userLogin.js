require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Please provide password",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      token: token,
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = userLoginController;
