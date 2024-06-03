const User = require("../../models/userModel");

const userDetailsController = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById({ _id: userId });
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details found.",
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error occured!",
      error: true,
      success: false,
    });
  }
};

module.exports = userDetailsController;
