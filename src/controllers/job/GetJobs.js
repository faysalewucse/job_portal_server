const Job = require("../../models/Job");
const { successResponse } = require("../responseController");

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    return successResponse(res, {
      statusCode: 200,
      message: "Jobs retrieved successfully",
      payload: { jobs },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getJobs;
