const createHttpError = require("http-errors");
const { successResponse } = require("../../controllers/responseController");
const User = require("../../models/User");
const { findById } = require("../../services/findById");

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const options = { password: 0 };
    const user = await findById(User, userId, options);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (user.role === "admin") {
      throw createHttpError(403, "Cannot delete an admin user");
    }

    const updateOptions = { new: true, runValidators: true, context: "query" };
    const updates = { isDeleted: true };

    const result = await User.findByIdAndUpdate(userId, updates, updateOptions);

    if (!result) {
      throw createHttpError(404, "Update failed");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
