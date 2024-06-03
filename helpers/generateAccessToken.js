require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAccessTokenAfterInvalid = (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({
      message: "Unauthorized user",
      success: false,
      error: true,
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Unauthorized user",
        success: false,
        error: true,
      });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const newAccessToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 3600000,
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.status(200).json({
      message: "Successfully generated new access token",
      success: true,
      error: false,
      accessToken: newAccessToken,
    });
  });
};

module.exports = generateAccessTokenAfterInvalid;
