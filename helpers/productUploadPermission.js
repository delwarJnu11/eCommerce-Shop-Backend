const User = require("../models/userModel");

const productUploadPermission = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return false;
  }

  if (user?.role === "ADMIN") {
    return true;
  }
  return false;
};

module.exports = productUploadPermission;
