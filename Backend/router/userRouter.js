const express = require("express");

const { getUser, createUser, getByUser, deleteUser, updateUser, userLogin, followUser, verifyToken, forgotPassword, resetPassword } = require("../controller/userController");
const verifyUser = require("../middleware/auth");
const route = express.Router()


route.get("/", getUser)
route.post("/", createUser)
route.post("/login", userLogin)

route.get("/verify-email/:verificationToken", verifyToken)
route.post("/reset-password/:resetToken", resetPassword)
route.post("/forgot-password", forgotPassword)


route.get("/:id",getByUser)
route.delete("/:id",verifyUser,deleteUser)
route.patch("/:id",verifyUser,updateUser)
route.post("/:id",verifyUser,followUser)


module.exports = route