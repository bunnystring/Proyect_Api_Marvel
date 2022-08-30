const express = require("express")
const router = express.Router()
const fs = require("fs")

const PATH_ROUTES = __dirname;//todo

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
        console.log(`cargando ruta ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //Todo va a hacer el nombre del archivo
    }
})


module.exports = router