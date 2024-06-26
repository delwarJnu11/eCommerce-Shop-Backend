const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({
        message: "Please Login for this action!",
        error: true,
        success: false,
      });
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decode) => {
        if (error) {
          return res.redirect("https://shopee-liard-mu.vercel.app/auth/login");
        }
        req.userId = decode._id;
        next();
      });
    }
  } catch (err) {
    let errorMessage;
    if (err.name === "JsonWebTokenError") {
      errorMessage = "Invalid or expired token";
    } else {
      errorMessage = "Internal Server Error";
    }

    res.status(err.status || 500).json({
      message: errorMessage,
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;
