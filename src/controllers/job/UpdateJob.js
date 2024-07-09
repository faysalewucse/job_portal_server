const generateJobSlug = require("../../helper/generateJobSlug");
const Job = require("../../models/Job");
const { successResponse, errorResponse } = require("../responseController");
const createHttpError = require("http-errors");

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, company, location, department } = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        department: department.toLowerCase().replace(" ", "_"),
        slug: generateJobSlug(title),
      },
      { new: true }
    );

    if (!job) {
      throw createHttpError(404, "Job not found!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Job updated successfully",
      payload: { job },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateJob;
