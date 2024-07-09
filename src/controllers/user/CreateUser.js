const User = require("../../models/User");
const { successResponse } = require("../responseController");
const { createJSONWebToken } = require("../../helper/jsonwebtoken");
const checkUserExistance = require("../../helper/checkUserExistance");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await checkUserExistance(email);

    const newUser = {
      name,
      email,
      password,
    };

    const token = createJSONWebToken(newUser);

    const user = await User.create(newUser);

    return successResponse(res, {
      statusCode: 201,
      message: `User created successfully`,
      payload: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
