require("dotenv").config();

const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      error: false,
      message: "User logged out successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
      data: [],
    });
  }
};

module.exports = userLogoutController;
