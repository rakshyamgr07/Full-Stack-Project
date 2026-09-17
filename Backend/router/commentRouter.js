const express = require("express");
const verifyUser = require("../middleware/auth");
const { commentPost ,deleteComment, updateComment, likeComment} = require("../controller/commentController");
const route = express.Router()

route.post("/:id/comment", verifyUser, commentPost)
route.delete("/:id/comment/:commentId", verifyUser, deleteComment)
route.patch("/:id/comment/:commentId", verifyUser, updateComment)
route.post("/:id/comment/:commentId", verifyUser, likeComment)


module.exports = route
