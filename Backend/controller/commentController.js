const User = require("../model/userSchema")
const Post = require("../model/postSchema")
const errorHandler = require("../utils/handleError")
const Comment = require("../model/commentSchema")

async function commentPost(req, res) {
    try {
        const { comment } = req.body
        const { id } = req.params
        const creator = req.user

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "please enter comment"
            })
        }
        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const findPost = await Post.findById(id)
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        const newComment = await Comment.create({ comment, post: id, user: creator })
        const data = await Post.findByIdAndUpdate(id, { $push: { comments: newComment._id } })
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateComment(req, res) {
    try {
        const { id, commentId } = req.params
        const creator = req.user
        const { comment } = req.body

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "please enter the comment"
            })
        }
        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const findPost = await Post.findById(id)
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }

        const findComment = await Comment.findById(commentId)
        if (!findComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        if (creator !== findPost.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only update your own comment"
            })
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { comment },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "comment updated successfully",
            comments: updatedComment
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteComment(req, res) {
    try {
        const { id, commentId } = req.params
        const creator = req.user
        // console.log(creator)
        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const findComment = await Comment.findById(commentId)
        if (!findComment) {
            return res.status(404).json({
                success: false,
                message: "comment not found"
            })
        }
        const findPost = await Post.findById(id)

        // console.log(findComment)
        // console.log(findPost)

        // console.log(post.creator)
        // console.log(findPost.creator.toString())


        if (creator !== findPost.creator.toString() && creator !== findComment.user.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own comment"
            })
        }

        await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } })

        await Comment.deleteOne({ _id: commentId })
        return res.status(200).json({
            success: true,
            message: "Comment deleted Successfully"
        })


    } catch (error) {
        return errorHandler(res, error)
    }
}

async function likeComment(req, res) {
    try {
        const { id, commentId } = req.params
        const creator = req.user
        const comment = await Comment.findById(commentId)
        const findComment = await Comment.findById(commentId)
        if (!findComment) {
            return res.status(404).json({
                success: false,
                message: "comment doesn't exists"
            })
        }

        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const findPost = await Post.findById(id)
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }

        if (!comment.likes.includes(creator)) {
            await Comment.findByIdAndUpdate(commentId, { $push: { likes: creator } })
            return res.status(200).json({
                success: true,
                message: "comment liked!",
                likes: {
                    creator
                }
            })
        } else {
            await Comment.findByIdAndUpdate(commentId, { $pull: { likes: creator } })
            return res.status(200).json({
                success: true,
                message: "comment disliked!",
            })
        }
    } catch (error) {
        return errorHandler(res, error)
    }
}
module.exports = { commentPost, updateComment, deleteComment, likeComment }
