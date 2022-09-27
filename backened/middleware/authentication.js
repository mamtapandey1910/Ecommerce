const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const authentication = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    // const token = req.header("token");
    if (!token) {
        return next(new ErrorHandler(401, "Please login firsttt"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedData.id;
    req.user = await User.findById(id);
    if (!req.user) {
        return next(new ErrorHandler(400, "User doesn't exist"));
    }
    next()
})

module.exports = authentication;