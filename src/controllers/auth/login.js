const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { createJSONWebToken } = require("../../helper/jsonwebtoken");
const { successResponse } = require("../responseController");
const { jwtSecretKey } = require("../../secret");

const handleLogin = async (req, res, next, roleCheck = null) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(
        404,
        "User does not exist with this email, Please register first."
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw createHttpError(401, "Password does not match.");
    }

    if (user.isBanned) {
      throw createHttpError(403, "You are banned. Please contact support.");
    }

    if (roleCheck && user.role !== roleCheck) {
      throw createHttpError(403, `Invalid credentials for role ${roleCheck}`);
    }

    const token = createJSONWebToken({ user }, jwtSecretKey, "1d");

    return successResponse(res, {
      statusCode: 200,
      message: `User logged in successfully`,
      payload: {
        user,
        accessToken: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = handleLogin;
