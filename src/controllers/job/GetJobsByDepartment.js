const departments = require("../../constant/departments");
const Job = require("../../models/Job");
const { successResponse } = require("../responseController");

const getJobsByDept = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    // Initialize a result object with department titles as keys and empty arrays as values
    const categorizedJobs = departments.reduce((acc, dept) => {
      acc[dept.title.toLowerCase().replace(" ", "_")] = [];
      return acc;
    }, {});

    // Categorize jobs by department
    jobs.forEach((job) => {
      const departmentKey = job.department.toLowerCase().replace(" ", "_");
      if (categorizedJobs[departmentKey]) {
        categorizedJobs[departmentKey].push(job);
      } else {
        // If the department is not in the predefined list, categorize it under 'others'
        if (!categorizedJobs["others"]) {
          categorizedJobs["others"] = [];
        }
        categorizedJobs["others"].push(job);
      }
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Jobs retrieved successfully",
      payload: categorizedJobs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getJobsByDept;
