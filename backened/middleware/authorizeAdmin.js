const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Errorhandler = require("../utils/errorHandler")
const authorizeAdmin = (...roles) => {
    return async function (req, res, next) {
        // req.user is coming from authentication middleware
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(401, `${req.user.role} is not authorize`));
        }
        next()
    }
}

module.exports = authorizeAdmin;

