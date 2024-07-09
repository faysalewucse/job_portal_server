const express = require("express");
const runValidation = require("../validators");
const { validateJob } = require("../validators/jobValidator");
const createJob = require("../controllers/job/CreateJob");
const getJobs = require("../controllers/job/GetJobs");
const updateJob = require("../controllers/job/UpdateJob");
const deleteJob = require("../controllers/job/DeleteJob");
const getJobsByDept = require("../controllers/job/GetJobsByDepartment");

const jobRouter = express.Router();

jobRouter.post("/", validateJob, runValidation, createJob);
jobRouter.get("", getJobs);
jobRouter.get("/by-dept", getJobsByDept);
jobRouter.put("/:id", updateJob);
jobRouter.delete("/:id", deleteJob);

module.exports = jobRouter;
