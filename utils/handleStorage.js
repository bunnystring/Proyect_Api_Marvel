const multer = require("multer")

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    }, filename: function(req, file, cb){
        //TODO: mi-cv.pdf 
        const ext = file.originalname.split(".").pop() // TODO ["name", "png"] .pop(agarra el ultimo valor del array)
        const filename = `file-${Date.now()}.${ext}`; //TODO formato unix  16266 aleatorio
        cb(null, filename)
    },
})
const uploadMiddleware = multer({storage})

module.exports = uploadMiddleware;