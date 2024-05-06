const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("user not found!");
    } else {
      const checkPassword = bcrypt.compareSync(password, user.password);

      if (checkPassword) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        const tokenOptions = {
          httpOnly: true,
          secure: true,
        };

        res.cookie("token", token, tokenOptions).status(200).json({
          message: "Login successfull",
          token: token,
          success: true,
          error: false,
          data: user,
        });
      } else {
        throw new Error("Please check Password");
      }
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = userLoginController;
