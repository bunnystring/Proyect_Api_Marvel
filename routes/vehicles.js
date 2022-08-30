const express = require("express");
const router = express.Router();
const {getItems, createItem, getItem, deleteItem, updateItem} = require("../controllers/vehicles");
const {validatorCreateItem, validatoGetItem, validatorGetItemId} = require("../validators/vehicles")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
//todo http://localhost:3000/vehicles

/**
 * Listar todos los vehiculos
 */
 router.get("/",authMiddleware,checkRol(["admin","user"]), getItems)
/**
 * Crear un vehiculo 
 */
 router.post("/",authMiddleware,checkRol(["admin"]), validatorCreateItem, createItem)
 /**
 * Listar un vehiculo por su nombre
 */
 router.get("/:name",authMiddleware,checkRol(["admin","user"]),validatoGetItem, getItem)

/**
 * Eliminar un vehiculo
 */
 router.delete("/:_id",authMiddleware,checkRol(["admin"]),validatorGetItemId, deleteItem)
/**
 * Actualizar un vehiculo
 */
 router.put("/:_id",authMiddleware,checkRol(["admin"]), validatorGetItemId, updateItem)

module.exports = router;