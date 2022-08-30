const { check } = require("express-validator")
const { handleHttpError } = require("../utils/handleHttpError")
/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log({ user })
        const rolesByUser = user.role; //["admin","user"]
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // en rolesByUser existe uno de los valores que roles.some(rolsingle) esta recorriendo devuelve tru o false
        if (!checkValueRol) {
            handleHttpError(res, "El usuario no tiene permiso para realizar esta accion", 403)
            return
        }
        next()
    } catch (e) {
        handleHttpError(res, "Ocurrio un error de roles", 403)
        return
    }
}
module.exports = checkRol
