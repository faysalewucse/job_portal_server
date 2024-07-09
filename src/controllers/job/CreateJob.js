const generateJobSlug = require("../../helper/generateJobSlug");
const Job = require("../../models/Job");
const { successResponse } = require("../responseController");

const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, department } = req.body;

    const newJob = {
      title,
      description,
      company,
      location,
      department: department.toLowerCase().replace(" ", "_"),
      slug: generateJobSlug(title),
    };

    const job = await Job.create(newJob);

    return successResponse(res, {
      statusCode: 201,
      message: "Job created successfully",
      payload: { job },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = createJob;
