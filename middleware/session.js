const {handleHttpError} = require("../utils/handleHttpError")
const {verifyToken} = require("../utils/handleJwt")
const {usersModel} = require("../models")
const authMiddleware = async (req, res, next) => {
    try {
        
        if (!req.headers.authorization) {
            handleHttpError(res, "No hay token ", 409)
        return
        }
        const token = req.headers.authorization.split(' ').pop(); // todo el token y omitira la paabra bearer
        const dataToken = await verifyToken(token);
        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN ", 401)
            return
        }
        const user = await usersModel.findById(dataToken._id) //Econtrar el usuario que esta ingrensando
        req.user = user //Inyectando propiedad user
        
        next()

    } catch (e) {
        handleHttpError(res, "No realizo sesion ", 401)
        return
    }
}

module.exports = authMiddleware