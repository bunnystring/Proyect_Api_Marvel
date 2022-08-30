const { vehiclesModel } = require("../models") //index.js //models
const { diacriticSensitiveRegex } = require("../utils/diacriticSensitiveRegex")
const { handleHttpError } = require("../utils/handleHttpError")
const { matchedData } = require("express-validator");
/**
 * Obtener mutantes de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await vehiclesModel.find({}); //Traerme todo // devuelve una promesa
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR AL TRAER TODOS LOS VEHICULOS", 404)
        return
    }

};
/**
 * Obtener el detalle de un mutante
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { name } = matchedData(req)
        console.log({ name })
        const data = await vehiclesModel.find({ name: { $regex: diacriticSensitiveRegex(name), $options: 'i' } }); //Traerme todo // devuelve una promesa
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR AL TRAER VEHICULO", 404)
        return
    }
};

/**
 * Insertar un mutante
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)  // cuando la constante se llama igual que la propiedad que queremos buscar se hace una destrucutracion de {}
        const data = await vehiclesModel.create(body)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR AL CREAR VEHICULO", 404)
        return
    }
};

/**
 * Actualizar un mutante
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const { _id, name, type, ...body } = matchedData(req)
        console.log({name})
        const data = await vehiclesModel.findOneAndUpdate({_id}, { $set: { name, type } })
        res.send(data)
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR AL ACTUALIZAR VEHICULO", 404)
        return
    }
};

/**
 * Eliminar mutante
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
       const {_id} = matchedData(req)
       console.log({_id})
       const data = await vehiclesModel.delete({_id})
       res.send({data})
    } catch (e) {
        handleHttpError(res,"ERROR AL INTENTAR ELIMINAR VEHICULO", 404)
        return
    }
};
module.exports = { getItems, getItem, createItem, updateItem, deleteItem } //destructuracion