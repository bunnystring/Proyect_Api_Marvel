const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Debes de pasar el objeto del usuario ej: name, password
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign =  jwt.sign(
        { //payload objeto del usuario
        _id: user._id,
        role: user.role
        },
        JWT_SECRET,
        {
            expiresIn:"5h",
        }
    );
    return sign
}
/**
 * Debes de pasar el token de sesion
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
};

module.exports = {tokenSign, verifyToken}