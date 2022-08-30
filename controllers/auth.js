const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleHttpError")

/**
 * Este contorlador registra un usario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password)
        const body = { ...req, password }
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false }) // se hace cuando el metodo no permite un filtrado en este caso create hace un isntanciamiento desdela bd
        //Devolvemos un objeto con los siguientes parametros
        const data = {
            token: await tokenSign(dataUser), // token generado
            user: dataUser
        }
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "Ocurrio Algo al intentar registrar un usuario", 403)
        return
    }
}
/**
 * Este controlador es el encargado de loguear
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({email:req.email})
        .select('password name role email') //aplicar un filtro y traer la data

        if (!user) {
            handleHttpError(res, "El usuario no existe", 404)
            return
        } 
        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword) //devuelve true o false
        if (!check) {
            handleHttpError(res, "Password invalida", 409)
            return
        }
        user.set('password' , undefined, {strict:false}) //Evitar el password
        const data = {
            status: 200,
            token: await tokenSign(user),
            user //objeto user
        }
        res.send({data})
    } catch (e) {
        console.log(e)
        handleHttpError(res, "Error al loguear", 403)
        return
    }
}

module.exports = { registerCtrl, loginCtrl }