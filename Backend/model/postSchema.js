const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true //remove whitespace
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    draft: {
        type: Boolean,
        default: false

    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
}, { timestamps: true })//timestamps record when the data is created and updated
const Post = mongoose.model("post", postSchema)
module.exports = Post