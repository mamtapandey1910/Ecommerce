const ErrorHandler = require("../utils/errorHandler");

errors = ((err, req, res, next) => {
    // Handled wrong product id error
    if (err.name === "CastError") {
        const invalidError = new ErrorHandler(400, `Resouce not found, invalid ${err.path}`);
        return res.status(invalidError.statuscode).json({ success: false, message: invalidError.message, error: err.stack })
    }

    if (err.name === "ValidationError") {
        err.statuscode = 400
    }

    if (err.name === "JsonWebTokenError") {
        return new ErrorHandler(400, "Json Web Token is invalid")
    }

    if (err.code === 11000) {
        const duplicateError = new ErrorHandler(400, "User already exists")
        return res.status(duplicateError.statuscode).json({ success: false, message: duplicateError.message, error: err.stack })
    }

    // console.log(err.statuscode, err.message)
    res.status(err.statuscode || 500).json({ success: false, message: err.message, error: err.stack })
})

module.exports = errors;