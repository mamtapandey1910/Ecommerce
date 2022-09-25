const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const authentication = catchAsyncErrors(async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return next(new ErrorHandler(401, "Please login firsttt"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedData.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler(400, "User doesn't exist"));
        // res.status(400).json({ success: false, message: "Please login first" });
    }
    next()
})

module.exports = authentication;