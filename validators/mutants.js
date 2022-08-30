const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:1, max:30}),
    check("city")
    .exists()
    .notEmpty()
    .isLength({min:1, max:30}),
    check("abilities")
    .exists()
    .notEmpty()
    .isLength({min:1, max:30}),
    check("vehiclesId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("mediaId")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];
const validatorUpdateItem = [

];
const validatorGetItem = [
    check("name")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];
const validatorGetItemId = [
    check("_id")
    .exists()
    .notEmpty(),
    check("name")
    .exists()
    .notEmpty(),
    check("city")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];



module.exports = {validatorCreateItem, validatorGetItem, validatorGetItemId};