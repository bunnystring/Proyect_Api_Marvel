
const express = require("express")
const router = express.Router()
const uploadMiddleware = require("../utils/handleStorage")
const {validatorGetItemId} = require("../validators/storage")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const {createItem, getItem, getItems, deleteItem} = require("../controllers/storage")

/**
 * Obtener todos los Storage
 */
router.get("/",authMiddleware,checkRol(["admin","user"]), getItems)

/**
 * Obtener un  Storage
 */
 router.get("/:id",authMiddleware,checkRol(["admin","user"]), validatorGetItemId, getItem)
/**
 * Eliminar  los Storage
 */
 router.delete("/:id",authMiddleware,checkRol(["admin"]), validatorGetItemId, deleteItem);
/**
 * Crear  los Storage
 */
router.post("/",authMiddleware,checkRol(["admin"]), uploadMiddleware.single("myfile"), createItem)


module.exports = router;