const Comment = require("../model/commentSchema");
const Post = require("../model/postSchema");
const User = require("../model/userSchema");
const { generateJWT, verifyJWT } = require("../utils/generateToken");
const errorHandler = require("../utils/handleError")
const bcrypt = require('bcrypt');
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/sendEmail");

async function getUser(req, res) {
    try {
        const users = await User.find()
          return res.status(200).json({
               success: true,
               message: "User fetch successfully",
               users
        })
    } catch (error) {
        return errorHandler(res, error, "failed to fetched data")
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password ,cpassword} = req.body
        if (!name || !email || !password ||!cpassword) {
            return res.status(200).json({
                success: true,
                message: "please insert all fields"
            })
        }
        //to check the uniqueness of email
        const checkexistinguser = await User.findOne({ email })
        if (checkexistinguser) {
            if (checkexistinguser.verify) {
                return res.status(200).json({
                    success: false,
                    message: "user with this email already exist"
                })
            } else {
                let token = await generateJWT({
                    id: checkexistinguser._id,
                    email: checkexistinguser.email,
                })
                await sendVerificationEmail(checkexistinguser.email, token)
                // const user = await User.find()
                return res.status(200).json({
                    success: true,
                    message: "please check your email to verify the mail",
                })
            }
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPassword })//this push those data in the database

        let token = await generateJWT({
            id: newUser._id,
            email: newUser.email,
        })
        await sendVerificationEmail(newUser.email, token)
        // const user = await User.find()
        return res.status(200).json({
            success: true,
            message: "please check your email to verify the mail",
            newUser
        })
    } catch (error) {
        return errorHandler(res, error, "failed to fetched data")
        // return errorHandler(res,error)// it will print deafult message i.e server error
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({
                success: true,
                message: "please insert all fields"
            })
        }
        //to check the uniqueness of email
        const checkexistinguser = await User.findOne({ email })
        if (!checkexistinguser) {
            return res.status(200).json({
                success: false,
                message: "user not registered"
            })
        }
        let token = await generateJWT({ email: checkexistinguser.email, id: checkexistinguser._id })
        if (!checkexistinguser.verify) {
            await sendVerificationEmail(checkexistinguser.email, token)
            return res.status(200).json({
                success: true,
                message: "please check your email to verify the mail",
            })
        }
        const hashPassword = await bcrypt.compare(password, checkexistinguser.password)
        if (!hashPassword) {
            return res.status(200).json({
                success: false,
                message: "user not available"
            })
        }
        // const user = await User.find()
        return res.status(200).json({
            success: true,
            message: "user login successfully",
            user: {
                id: checkexistinguser._id,
                name: checkexistinguser.name,
                email: checkexistinguser.email,
                posts: checkexistinguser.posts,
                token
            }
        })
    } catch (error) {
        return errorHandler(res, error, "failed to fetched data")
        // return errorHandler(res,error)// it will print deafult message i.e server error
    }
}

async function getByUser(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const creator = req.user
        console.log(creator)
        const user = await User.findById(id)
        return res.status(200).json({
            success: true,
            message: "user fetch successfully",
            users: user
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const creator = req.user
        console.log(creator)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        if (creator !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own account"
            })
        }

        // Finding all posts created by this user
        const posts = await Post.find({
            creator: id
        }).select("_id")

        // Delete all comments belonging to those posts
        const postIds = posts.map(post => post._id)
        await Comment.deleteMany({
            post: { $in: postIds }
        })

        // Delete user's posts
        await Post.deleteMany({ creator: id })


        //Delete User
        await User.deleteOne({ _id: id })

        return res.status(200).json({
            success: true,
            message: "user deleted successfully",
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const { name, email, password } = req.body//value pick garnu parxa 

        const creator = req.user
        console.log(creator)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                users: user
            })
        }
        if (creator !== user._id.toString()) { //user._id object ma hunxw so it is needed to be converted to the string
            return res.status(403).json({
                success: false,
                message: "you can only update your own account"
            })
        }
        let hashPassword = user.password
        if (password) {
            hashPassword = await bcrypt.hash(password, 10)
        }
        await User.updateOne({ _id: id }, { name, email, password: hashPassword }, { new: true })
        const updateUser = await User.findById(id) //it is used to fetch the updated users details 
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            users: updateUser
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function followUser(req, res) {
    try {
        const creator = req.user
        const { id } = req.params
        const user = await User.findById(creator)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (!user.following.includes(id)) {
            await User.findByIdAndUpdate(creator, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: creator } })
            return res.status(200).json({
                success: true,
                message: "User Followed !",
                followers: {
                    creator
                }
            })
        } else {
            await User.findByIdAndUpdate(creator, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: creator } })
            return res.status(200).json({
                success: true,
                message: "user  Unfollowed !"
            })
        }
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function verifyToken(req, res) {
    try {
        const { verificationToken } = req.params
        const token = await verifyJWT(verificationToken)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "invalid token/email expired",
            })
        }

        const { id } = token
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        await User.updateOne({ _id: id }, { verify: true })
        return res.status(200).json({
            success: true,
            message: "email verified successfully",
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(404).json({
                success: false,
                message: "Email is required"
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        let token = await generateJWT({ email: user.email, id: user._id })

        await sendResetPasswordEmail(user.email, token)
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function resetPassword(req, res) {
    try {
       const { resetToken } = req.params
       const { newPassword } = req.body
        if (!newPassword) {
            return res.status(404).json({
                success: false,
                message: "Password is required"
            })
        }
        const token = await verifyJWT(resetToken)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "invalid token/email expired",
            })
        }

        const { id } = token
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword,10)
        await User.updateOne({ _id: id }, { password: hashPassword })
        return res.status(200).json({
            success: true,
            message: "password reset successfully",
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
module.exports = { getUser, createUser, getByUser, deleteUser, resetPassword, updateUser, userLogin, followUser,verifyToken
    ,forgotPassword
 }