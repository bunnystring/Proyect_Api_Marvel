require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const app = express()
app.use(cors())
app.use(express.json()) //preparate para recibir un json
app.use(express.static("storage"))


  
morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip: function(req, res){
        user = req.user
        return res.statusCode < 400 //TODO 200, 300 Lo omitira
    }
})
const port = process.env.PORT || 3000

/**
 * Aqui invoco las rutas
 */
//TODO localhost/api/_____
app.use("/api",require("./routes"))
app.listen(port,  () => {
    console.log(`http://localhost:${port}`);
})

dbConnect()