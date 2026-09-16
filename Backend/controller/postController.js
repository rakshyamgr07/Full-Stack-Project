const Post = require("../model/postSchema")
const User = require("../model/userSchema")
const errorHandler = require("../utils/handleError")
const fs = require("fs")
const { uploadImage, deleteImage } = require("../utils/uploadImage")
const ShortUniqueId = require('short-unique-id');
const Comment = require("../model/commentSchema")
const { randomUUID } = new ShortUniqueId({ length: 10 });

async function getPost(req, res) {
    try {
        const users = await Post.find()
        const pageNumber = Number(req.query.page)
        const limitNumber = Number(req.query.limit)
        const skipNumber = (pageNumber - 1) * limitNumber
        const post = await Post.find({ draft: false })
            .populate("creator", "name email")
            .sort({ createdAt: -1 })
            .limit(limitNumber)
            .skip(skipNumber)
        const totalPost = await Post.countDocuments({ draft: false })
        return res.status(200).json({
            success: true,
            message: "Post fetch successfully",
            users,
            totalPost,
            hasMore: skipNumber + limitNumber < totalPost,
            posts:post
        });
    } catch (error) {
        return errorHandler(res, error, "failed to fetched data")
    }
}

async function createPost(req, res) {
    try {
        const { title, description, draft } = req.body
        const creator = req.user
        const image = req.file.path
        if (!title || !description || !creator) {
            return res.status(400).json({
                success: false,
                message: "please insert the required fields"
            })
        }
        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const { public_id, secure_url } = await uploadImage(image)
        fs.unlinkSync(image)

        // const postId = title.toLowerCase().split(" ").join("-")+"-"+randomUUID()
        const postId = title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-") + "-" + randomUUID()

        const newPost = await Post.create({
            title, description, draft, creator,
            imageUrl: secure_url, imageId: public_id,
            postId
        })
        await User.findByIdAndUpdate(creator, { $push: { posts: newPost._id } })
        return res.status(200).json({
            success: true,
            message: "post created successfully",
            posts: newPost
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getPostById(req, res) {
    try {
        const { id } = req.params

        console.log("ID received:", id);
        const creator = req.user
        // console.log(creator)
        const post = await Post.findOne({ postId: id }).populate("creator","name email").populate({
            path:"comments",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"user",
                select:"name email"
            }
        })
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "post fetched successfully",
            posts: post
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params
        const creator = req.user
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found",
                post
            })
        }
        if (creator !== post.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own account"
            })
        }

        //delete post's comments
        await Comment.deleteMany({ post: id })


        await deleteImage(post.imageId)
        //delete the post
        await Post.deleteOne({ _id: id })
        //delteing post from the user's post array also
        await User.findByIdAndUpdate(post.creator, { $pull: { posts: id } })
        return res.status(200).json({
            success: true,
            message: "post deleted successfully",
            post
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const creator = req.user
        const image = req.file.path
        const { title, description, draft } = req.body//value pick garnu parxa 
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found",
                posts: post
            })
        }
        if (creator !== post.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only update your own account"
            })
        }
        const updateData = {
            title: title || post.title,
            description: description || post.description,
            draft: draft || post.draft,

        }
        if (req.file) {
            const image = req.file.path;
               await deleteImage(post.imageId);
               const { public_id, secure_url } = await uploadImage(image)
               updateData.imageUrl = secure_url;
               updateData.imageId = public_id;
               fs.unlinkSync(image)
        }

        await Post.updateOne({ _id: id }, { $set: updateData })
        const updatePost = await Post.findById(id)
        return res.status(200).json({
            success: true,
            message: "post updated successfully",
            posts: post
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function likePost(req, res) {
    try {
        const { id } = req.params
        const creator = req.user
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }
        if (!post.likes.includes(creator)) {
            await Post.findByIdAndUpdate(id, { $push: { likes: creator } })
            return res.status(200).json({
                success: true,
                message: "post liked! ",
                likes: {
                    creator
                }
            })
        } else {
            await Post.findByIdAndUpdate(id, { $pull: { likes: creator } })
            return res.status(200).json({
                success: true,
                message: "post  disliked"
            })
        }
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function searchPost(req, res) {
    try {
        const search = req.query.search
        const pageNumber = Number(req.query.page)
        const limitNumber = Number(req.query.limit)
        const filter = {
            draft: false,
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        }
        //$or means at least ONE of these conditions must be true.
        //  $regex is used for pattern/text searching and
        //  $options:"i" means that it is case-insensitive
        // populate() gets information about that user.
        // sort: This means show the newest posts first.  -1 = descending.
        //.skip(skipNumber) This skips the results from previous pages.


        const skipNumber = (pageNumber - 1) * limitNumber
        const posts = await Post.find(filter)
            .populate("creator", "name email")
            .sort({ createdAt: -1 })
            .limit(limitNumber)
            .skip(skipNumber)
        const totalPost = await Post.countDocuments(filter)
        if (posts.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found. Try different or more general keywords.",
            });
        }
        return res.status(200).json({
            success: true,
            message: `Found ${posts.length} result(s) for "${search}"`,
            totalPost,
            hasMore: skipNumber + limitNumber < totalPost,
            posts
        });
    } catch (error) {
        return handleError(res, error)
    }
}
module.exports = { getPost, createPost, getPostById, deletePost, updatePost, likePost, searchPost }