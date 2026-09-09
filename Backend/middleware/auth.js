const { verifyJWT } = require("../utils/generateToken")

const verifyUser = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "please sign in"
        })
    }
    let user = await verifyJWT(token)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "please sign in"
        })
    }
    req.user = user.id
    next()
}
module.exports = verifyUser