const { successResponse } = require("../responseController");

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    return successResponse(res, {
      statusCode: 200,
      message: `User logged out successfully`,
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = handleLogout;
