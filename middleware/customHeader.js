const {handleHttpError} = require("../utils/handleHttpError")
const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === 'sigase') {
            next()
        }else{
            handleHttpError(res, "La apikey no es correcta", 404)
            return
        }
    } catch (error) {
        handleHttpError(res, "Algo ocurrio", 404)
        return
    }
   
}

module.exports = customHeader 