const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const VehicleScheme = new mongoose.Schema(

    {
        name:{
            type:String,
            unique: true
        },
        type:{
            type:String
        }
    },
    {
        timestamps:true, //createdAt, updatedAt
        versionKey: false
    }
);
VehicleScheme.plugin(MongooseDelete,{overrideMethods: "all"})
module.exports = mongoose.model("vehicles", VehicleScheme) //nombre de la tabla y modelo