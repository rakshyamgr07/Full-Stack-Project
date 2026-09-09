const express = require("express");
const verifyUser = require("../middleware/auth");
const { commentPost ,deleteComment, updateComment, likeComment} = require("../controller/commentController");
const route = express.Router()

route.post("/:id/comment", verifyUser, commentPost)
route.delete("/:id/comment/:commentId", verifyUser, deleteComment)
route.patch("/:id/comment/:commentId", verifyUser, updateComment)
route.post("/:id/comment/:commentId", verifyUser, likeComment)


module.exports = route
//user following : user le aru lai liked garda : done
//user followed : user lai aru ley like garda: done
// api fetch garerw post sab react ma show garne 
//comment ko lagi form rw list : done
//like and unlike comment hau : done
//register and log in form: done
//title lai lowercase ma laijane ani space ma hypen aaunu paryo
