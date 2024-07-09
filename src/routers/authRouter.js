const express = require("express");
const runValidation = require("../validators");
const { createUser } = require("../controllers/user/CreateUser");
const handleLogin = require("../controllers/auth/login");
const handleLogout = require("../controllers/auth/logout");
const isLoggedOut = require("../middlewares/auth/isLoggedOut");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getProfile = require("../controllers/auth/GetProfile");
const { validateUserRegistration } = require("../validators/authValidator");
const handleAdminLogin = require("../controllers/auth/adminLogin");
const authRouter = express.Router();

authRouter.post(
  "/register",
  validateUserRegistration,
  runValidation,
  createUser
);

authRouter.get("/profile/:token", getProfile);
authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);

module.exports = authRouter;
