const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// user Registration
exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
    console.log("checking next")
    const createduser = await User.create(req.body)
    const token = await createduser.getJWTToken();
    res.status(201).json({ success: true, message: "user created", token });
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
    console.log(flag)
    if (flag) {
        const token = await user.getJWTToken();
        res.status(200).json({ success: true, message: "you have loggedIn succesfully", token });
    }
})