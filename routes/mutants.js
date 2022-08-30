const express = require("express")
const router = express.Router()
const {validatorCreateItem, validatorGetItem,validatorGetItemId} = require("../validators/mutants")
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/mutants")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
//TODO http://localhost/mutants GET,POST,DELETE, PUT

/**
 * Lista Mutantes
 */
router.get("/",authMiddleware, getItems)
/**authMiddleware,checkRol(["admin","user"]), */
/**
 * Crear Mutantes
 */
router.post("/",authMiddleware, validatorCreateItem, createItem)

/**
 * Buscar por Mutante
 */
router.get("/:name",authMiddleware,checkRol(["admin","user"]), validatorGetItem, getItem)

/**
 * Busqueda por id
 * Middleware de auttenticacion
 * 
 * actualizar un mutante
 */
router.put("/:_id",authMiddleware,checkRol(["admin"]), validatorGetItemId, updateItem)

/**
 * eliminar un mutante
 */
router.delete("/:_id",authMiddleware,checkRol(["admin"]), validatorGetItemId, deleteItem);

module.exports = router