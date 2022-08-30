const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const {diacriticSensitiveRegex} = require("../utils/diacriticSensitiveRegex")
const MutantScheme = new mongoose.Schema(

    {
        name: {
            type: String,
            unique: true
        },
        role: {
            type: ["hero", "villan"],
            default: "hero",
        },
        city: {
            type: String,
        },
        condition: {
            type: ["imprisoned", "free", "unknown"],
            default: "free",
        },
        abilities: {
            type:String
        },
        vehiclesId: {
            type: mongoose.Types.ObjectId, // Debe conformar un cierto patron de numero de caracteres
        },
        mediaId: {
            type: mongoose.Types.ObjectId, // Debe conformar un cierto patron de numero de caracteres
        },
    },
    {
        timestamps: true, //createdAt, updatedAt
        versionKey: false
    }
);
/**
 * Implementar metodo propio con relacion a vehiculos y storage
 */
MutantScheme.statics.findAllData = function () {
    const joinData = this.aggregate([ //Mutantes
        {
            $lookup:
            {
                from: "vehicles", //Desde mutantes >< con vehicles
                localField: "vehiclesId", //Mutantes.vehiclesId
                foreignField: "_id",// <> vechicles._id
                as: "vehiculo", //Alias
            }
        },
        {
            $unwind: "$vehiculo"
        },
        {
            $lookup:
            {
                from: "storages", //Desde mutante >< con storage
                localField: "mediaId", //Mutantes.mediaId
                foreignField: "_id",// <> storages._id
                as: "imagen", //Alias
            }
        },
        {
            $unwind: "$imagen"
        },
    ])

    return joinData
};

MutantScheme.statics.findOneData = async function (req) {
    nameOne = req.name
    const query =  this.find({name: { $regex: diacriticSensitiveRegex(nameOne), $options: 'i'}});
    const joinData = await this.aggregate([ //Mutantes
        {
            $match: {
                name: nameOne,
            },
        },
        {
            $lookup:
            {
                from: "vehicles", //Desde mutantes >< con vehicles
                localField: "vehiclesId", //Mutantes.vehiclesId
                foreignField: "_id",// <> vechicles._id
                as: "vehiculo", //Alias
            }
        },
        {
            $unwind: "$vehiculo"
        },
        {
            $lookup:
            {
                from: "storages", //Desde mutante >< con storage
                localField: "mediaId", //Mutantes.mediaId
                foreignField: "_id",// <> storages._id
                as: "imagen", //Alias
            }
        },
        {
            $unwind: "$imagen"
        },
    ])
return query
    
};
MutantScheme.plugin(mongooseDelete, { overrideMethods: "all" })  //sobrescribir los metodos que ya vienen nativos con el soft delete(borrado logico)
module.exports = mongoose.model("mutants", MutantScheme) //nombre de la tabla y modelo