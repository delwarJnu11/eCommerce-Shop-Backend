const User = require("../../models/userModel");

const updateUserRoleController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newRole } = req.body;

    if (!newRole) {
      return res.status(400).json({ message: "New role is required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user role
    user.role = newRole;
    await user.save();
    const users = await User.find();

    res.status(200).json({
      message: "User role updated successfully",
      success: true,
      error: false,
      users: users,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
module.exports = updateUserRoleController;
