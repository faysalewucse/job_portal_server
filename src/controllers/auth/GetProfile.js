const { successResponse } = require("../responseController");
const User = require("../../models/User");
const { findById } = require("../../services/findById");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { jwtSecretKey } = require("../../secret");

const getProfile = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      throw createHttpError(401, "Please provide token");
    }

    const decoded = jwt.verify(token, jwtSecretKey);

    if (!decoded) {
      throw createHttpError(401, "Unauthorized. Please login again.");
    }

    const id = decoded.user._id;
    const options = { password: 0 };
    const user = await findById(User, id, options);

    if (!user) {
      throw createHttpError(404, "No user found with this token.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User fetched successfully",
      payload: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
