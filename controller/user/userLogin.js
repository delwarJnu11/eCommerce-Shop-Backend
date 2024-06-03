require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    const accessToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 604800000,
    });

    return res.status(200).json({
      message: "Login successfull",
      accessToken,
      refreshToken,
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: "login hocche na",
      error: true,
      success: false,
    });
  }
};

module.exports = userLoginController;
