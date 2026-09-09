const mongoose = require("mongoose")

// for database schema : design database
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })//timestamps record when the data is created and updated

const User = mongoose.model("user", userSchema)
module.exports = User