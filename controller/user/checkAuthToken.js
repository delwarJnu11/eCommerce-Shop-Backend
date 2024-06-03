require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateAccessTokenAfterInvalid = require("../../helpers/generateAccessToken");

const checkAuthTokenController = async (req, res) => {
  const accessToken = req?.cookies?.accessToken;

  if (!accessToken) {
    return generateAccessTokenAfterInvalid(req, res);
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      message: "User is Authorized",
      success: true,
      error: false,
      user: decoded,
    });
  } catch (err) {
    return generateAccessTokenAfterInvalid(req, res);
  }
};

module.exports = checkAuthTokenController;
