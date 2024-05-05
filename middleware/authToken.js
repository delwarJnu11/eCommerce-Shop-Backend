const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    console.log(token);
    if (!token) {
      res.status(401).json({
        message: "Please Login!",
        error: true,
        success: false,
      });
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decode) => {
        if (error) {
          throw new Error("your token has been expired!");
        }
        req.userId = decode._id;
        next();
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "you don't have any access token. please login!",
      error: true,
      success: false,
      user: [],
    });
  }
};

module.exports = authToken;
