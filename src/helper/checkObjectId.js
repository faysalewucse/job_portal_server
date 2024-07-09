const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");

const checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, "Not a valid id!");
  }
};

module.exports = checkObjectId;
