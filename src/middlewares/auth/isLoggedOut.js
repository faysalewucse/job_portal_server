const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../secret");
const createHttpError = require("http-errors");

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1] || "";

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecretKey);
        if (decoded) {
          throw createHttpError(400, "User is already logged in");
        }
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isLoggedOut;
