const User = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "successfully retrieve all users.",
      error: false,
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      error: true,
      success: false,
      data: [],
    });
  }
};

module.exports = getAllUsersController;
