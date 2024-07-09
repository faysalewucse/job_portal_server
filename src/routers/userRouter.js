const express = require("express");
const getUsers = require("../controllers/user/GetUsers");
const getUser = require("../controllers/user/GetUser");
const deleteUser = require("../controllers/user/DeleteUser");
const upload = require("../middlewares/uploadFile");
const updateUser = require("../controllers/user/UpdateUser");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const isAdmin = require("../middlewares/auth/isAdmin");
const userRouter = express.Router();

userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.delete("/:id", isLoggedIn, isAdmin, deleteUser);
userRouter.put("/:id", updateUser);

module.exports = userRouter;
