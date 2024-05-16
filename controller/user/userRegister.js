const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user exists
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("user already exist.");
    }
    //check user name exists
    if (!name) {
      throw new Error("name is required!");
    }
    //check user name exists
    if (!email) {
      throw new Error("email is required!");
    }
    //check user name exists
    if (!password) {
      throw new Error("password is required!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong!");
    }

    const payload = {
      ...req.body,
      role: "CUSTOMER",
      password: hashPassword,
    };

    const newUser = new User(payload);
    const savedUser = await newUser.save();

    return res.status(201).json({
      data: savedUser,
      error: false,
      success: true,
      message: "user created successfully done!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};
module.exports = userRegisterController;
