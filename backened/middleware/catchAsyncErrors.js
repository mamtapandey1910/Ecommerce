const ErrorHandler = require("../utils/errorHandler");

module.exports = (func) => {
    return function (req, res, next) {
        Promise.resolve(func(req, res, next)).catch(next)
    }
}