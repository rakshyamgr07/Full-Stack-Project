const express = require("express");
const { getPost, getPostById, deletePost, updatePost, createPost, likePost, searchPost } = require("../controller/postController");
const verifyUser = require("../middleware/auth");
const upload = require("../utils/multer");
const route = express.Router()

// get method 
route.get("/", getPost)
route.get("/search-post", searchPost)
route.post("/",verifyUser,upload.single("image"), createPost)

route.get("/:id",verifyUser, getPostById)
route.delete("/:id",verifyUser, deletePost)
route.patch("/:id",verifyUser, upload.single("image"),updatePost)
route.post("/likes/:id", verifyUser,likePost)


module.exports = route
//cloudinary , multer , nodemailer,axios/fetch
//likes and dislikes haru