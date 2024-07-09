const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw createHttpError(401, "Login required");
    }

    const decoded = jwt.verify(token, jwtSecretKey);

    if (!decoded) {
      throw createHttpError(401, "Invalid access token. Please login again.");
    }
    req.body.user = decoded.user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isLoggedIn;
