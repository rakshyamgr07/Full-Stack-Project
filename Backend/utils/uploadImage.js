const cloudinary = require('cloudinary').v2;

async function uploadImage(imagePath){

    try {
           const result = await cloudinary.uploader.upload(imagePath)
           return result
    } catch (error) {
        console.log("Error upload image",error)
    }
}

async function deleteImage(imagePath){

    try {
           const result = await cloudinary.uploader.destroy(imagePath)
           return result
    } catch (error) {
        console.log("Error deleting image",error)
    }
}
module.exports = {uploadImage,deleteImage}