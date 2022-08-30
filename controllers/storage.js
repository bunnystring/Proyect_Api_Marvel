const fs = require("fs");
const {storageModel} = require('../models')
const {handleHttpError} = require("../utils/handleHttpError")
const {matchedData} = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`
/** 
*Obtener  lista dela base de datos!
* @param {*} req
* @param {*} res
*/

const getItems = async (req, res) => {
    try {

        const data = await storageModel.find({}); //Buscar todo  //findAll para mysql
        res.send({data})
        
    } catch (e) {
        handleHttpError(res, "Error Al intentar  listar los  items", 404)
        return
    }
};

/** 
*Obtener  un detalle!
* @param {*} req
* @param {*} res
*/

const getItem = async (req, res) => {
    const {id} = matchedData(req)
    try {
        const data = await storageModel.findById(id); //Buscar todo  //findAll para mysql
        res.send({data})
        
    } catch (e) {
        handleHttpError(res, `ERROR AL TRAER EL STORAGE ${id}`, 404)
        return
    }
}

/** 
*Insertar  un registro!
* @param {*} req
* @param {*} res
*/

const createItem = async (req, res) => {
    try {
        const {body , file} = req //Estructuracion de js

        console.log(file);
        const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
         }
        const data = await storageModel.create(fileData)
        res.status(201)
        res.send({data})
        
    } catch (e) {
        handleHttpError(res, "ERROR CREANDO STORAGE", 404)
        return
    }
};



/** 
*Eliminar un registro!
* @param {*} req
* @param {*} res
*/

const deleteItem = async (req, res) => {
    const {id} = matchedData(req)
    try {
        const dataFile = await storageModel.findById(id); //Buscar todo  //findAll para mysql
        await storageModel.delete({_id:id})
        const {filename} = dataFile
        const filePath = `${MEDIA_PATH}/${filename}` //TODO la ruta C:/apimarvel/storage/$filename
        console.log(filePath);
       // fs.unlinkSync(filePath) Eliminar registro fisico
        const data = {
            filePath,
            deleted:1
        }
        res.send({data})  
    } catch (e) {
        console.log(e);
        handleHttpError(res, "Error Al intentar  eliminar este storages", 404)
        return
    }
}


module.exports = {getItems, getItem, createItem, deleteItem};




