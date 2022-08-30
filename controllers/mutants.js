const {matchedData} = require("express-validator");
const {mutantsModel} = require("../models") //index.js //models
const {handleHttpError} = require("../utils/handleHttpError")


/**
 * Obtener mutantes de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await mutantsModel.findAllData({}); //Traerme todo // devuelve una promesa
        res.send({data})
    } catch (e) {
        handleHttpError(res, "ERROR AL TRAER TODOS LOS MUTANTES", 404)
        return;
    }
};
/**
 * Obtener el detalle de un mutante
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        
        req = matchedData(req)
        const {name} = req;
        const data = await mutantsModel.findOneData({name}); //Traerme todo // devuelve una promesa
        res.send({data})
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL TRAER MUTANTE ESPECIFICO", 404)
        return;
    }
};
/**
 * Insertar un mutante
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req) // cuando la constante se llama igual que la propiedad que queremos buscar se hace una destrucutracion de {}
        // console.log(body)
        const data = await mutantsModel.create(body);
        res.send({data});
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL CREAR UN MUTANTE", 400)
        return;
    }
};

/**
 * Actualizar un mutante
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {_id,name,city,role, ...body} = matchedData(req) // cuando la constante se llama igual que la propiedad que queremos buscar se hace una destrucutracion de {}
    //    const nameReq = body.name;
    //    const cityReq = body.city;
    console.log({_id, name, city})
        const data = await mutantsModel.findOneAndUpdate({_id},{ $set: { name, city } });
        res.send({data});
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR AL ACTUALIZAR UN MUTANTE", 400)
        return;
    }
};

/**
 * Eliminar mutante
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await mutantsModel.delete({_id:id}); //Traerme todo // devuelve una promesa
        res.send({data})
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL INTENTAR ELIMINAR MUTANTE", 404)
        return;
    }
};
module.exports = {getItems, getItem, createItem, updateItem, deleteItem} //destructuracion