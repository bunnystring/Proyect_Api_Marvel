const {validationResult} = require("express-validator")

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next() // continua hacia el controlador
    } catch (e) {
        res.status(403)
        res.send({errors: e.array() })
    }
}

module.exports = validateResults