const createHttpError = require("http-errors");
const User = require("../models/User");

const checkUserExistance = async (email) => {
  const userExists = await User.exists({ email: email });

  if (userExists) {
    throw createHttpError(
      409,
      "User with this email already exists, Please sign in"
    );
  }
};

module.exports = checkUserExistance;
