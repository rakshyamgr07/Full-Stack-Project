const jwt = require('jsonwebtoken');

// to generate JWT 
async function generateJWT(payload) {
    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
    return token
}

// to verify JWT
async function verifyJWT(token) {
    try {
        let data = jwt.verify(token,process.env.JWT_SECRET)
        return data
    } catch (error) {
        return false
    }
}

// to decode the JWT 
async function decodeJWT(token) {
    try {
        let data = jwt.decode(token,process.env.JWT_SECRET)
        return data
    } catch (error) {
        return false
    }
}

module.exports={generateJWT,verifyJWT,decodeJWT }