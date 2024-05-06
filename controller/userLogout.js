const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      error: false,
      message: "user logged out successfully.",
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
      data: [],
    });
  }
};

module.exports = userLogoutController;
