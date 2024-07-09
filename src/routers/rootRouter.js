// routers/apiV1Router.js
const express = require("express");
const { successResponse } = require("../controllers/responseController");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  return successResponse(res, {
    statusCode: 200,
    message: "API information fetched successfully",
    payload: {
      status: "success",
      message: "Welcome to the Job Portal API",
      version: "1.0.0",
      description:
        "This API provides access to Job Portal data and operations.",
      timestamp: new Date(),
    },
  });
});

module.exports = rootRouter;
