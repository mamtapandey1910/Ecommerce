const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");


// user Registration
exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
    console.log("user registration")
    const createduser = await User.create(req.body)
    sendToken(createduser, 201, res);
});



// User login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    // validate if email exists
    if (!email || !password) {
        return next(new ErrorHandler(400, "Please enter email and password"));
    }
    // validate if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "User not found"));
    }
    // send jwt token on login
    const flag = await bcrypt.compare(password, user.password);
    if (flag) {
        sendToken(user, 200, res);
    }
})