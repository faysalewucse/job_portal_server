const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const findByName = async (Model, name, options = {}) => {
  try {
    const result = await Model.findOne({ name }, options);

    if (!result) {
      throw createHttpError(404, `No ${Model.modelName} found!`);
    }

    return result;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createHttpError(400, `Invalid ${Model.modelName} id!`);
    }
    throw error;
  }
};

module.exports = {
  findByName,
};
