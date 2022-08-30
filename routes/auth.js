const express = require("express")
const router = express.Router()
const {validatorRegister, validatorLogin} = require("../validators/auth")
const {registerCtrl, loginCtrl} = require("../controllers/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")



//TODO http://localhost/mutants GET,POST,DELETE, PUT



/**
 * Crear un user
 */
router.post("/register",authMiddleware,checkRol(["admin"]), validatorRegister, registerCtrl);
/**
 * validar user
 */
 router.post("/login", validatorLogin, loginCtrl);
module.exports = router