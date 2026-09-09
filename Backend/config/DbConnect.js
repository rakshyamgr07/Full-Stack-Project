const mongoose = require("mongoose")


// to connect the database 
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error)

    }
}
module.exports = connectDb; // for exporting some page to others (linking)