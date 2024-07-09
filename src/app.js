const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const userRouter = require("./routers/userRouter");
const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routers/authRouter");
const rootRouter = require("./routers/rootRouter");
const jobRouter = require("./routers/jobRouter");

const app = express();

// const rateLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minute).
//   message: "Too many requests from this IP. please try again later.",
// });

// app.use(rateLimiter);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1", rootRouter); // Use the new router

// Client error handler
app.use((err, req, res, next) => {
  console.log(err);
  next(createError(400, err));
});

// Server Error handler
app.use((err, req, res, next) => {
  console.log(err);
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
