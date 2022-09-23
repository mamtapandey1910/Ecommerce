const ErrorHandler = require("../utils/errorHandler");

errors = ((err, req, res, next) => {
    // Handled wrong product id error
    if (err.name === "CastError") {
        const invalidError = new ErrorHandler(400, `Resouce not found, invalid ${err.path}`);
        return res.status(invalidError.statuscode).json({ success: false, message: invalidError.message, error: err.stack })
    }
    res.status(err.statuscode || 500).json({ success: false, message: err.message, error: err.stack })
})

module.exports = errors;