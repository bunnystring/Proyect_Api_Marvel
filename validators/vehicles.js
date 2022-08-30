const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:1, max:30}),
    check("type")
    .exists()
    .notEmpty()
    .isLength({min:1, max:30}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatoGetItem = [
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
    check("type")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = {validatorCreateItem, validatoGetItem, validatorGetItemId};