// to handle the error with dynamic message 
const errorHandler = (res,error,message ="server error")=>{
    return res.status(500).json({
            success: false,
            message,
            error: error.message
        })
}
module.exports = errorHandler
