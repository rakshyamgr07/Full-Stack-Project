require('dotenv').config() //.env 

const express = require("express");
const cors = require("cors")
const connectDb = require('./config/DbConnect');
const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');
const commentRouter = require('./router/commentRouter');
const cloudinaryConfig = require('./config/cloudinary');

const app = express()
const PORT = process.env.PORT || 4000 //if port is not given at 4000 it will run
app.use(cors())
app.use(express.json())//middleware
app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/post", commentRouter)



app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
    connectDb()
    cloudinaryConfig()
})
