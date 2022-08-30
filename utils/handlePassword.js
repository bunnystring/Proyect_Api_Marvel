const bcryptjs = require("bcryptjs")
/**
 * Contraseña sin encriptar: hola.01
 * @param {*} passwordPlain 
 */
const encrypt  = async (passwordPlain) => {
    return await bcryptjs.hash(passwordPlain, 10) //dificultad encriptado
    //Todo: laskdasl3243efff
}

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}
module.exports = {encrypt, compare}