const Job = require("../../models/Job");
const { successResponse, errorResponse } = require("../responseController");
const createHttpError = require("http-errors");

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      throw createHttpError(404, "Job not found!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Job deleted successfully",
      payload: { job },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteJob;
