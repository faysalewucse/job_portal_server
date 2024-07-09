const createHttpError = require("http-errors");

const isAdmin = async (req, res, next) => {
  try {
    if (req.body.user.role !== "admin") {
      throw createHttpError(
        403,
        "Forbidden. You are not allowed to access this route."
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAdmin;
