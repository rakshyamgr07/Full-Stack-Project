const { verifyJWT } = require("../utils/generateToken");

const verifyUser = async (req, res, next) => {
     const token = req.headers.authorization.split(" ")[1]
     if (!token) {
          return res.status(400).json({ success: false, message: "Please sign in" });
     }
     let user = await verifyJWT(token)
     if (!user) {
          return res.status(400).json({ success: false, message: "Please sign in" });
     }
     req.user = user.id
     next()
}
module.exports = verifyUser;