const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
    const createduser = await User.create(req.body)
    const token = await createduser.getJWTToken();
    res.status(201).json({ success: true, message: "user created", token });
});

exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password");
    console.log(password)
    console.log(user.password);
    if (user) {
        const flag = await bcrypt.compare(password, user.password);
        console.log(flag)
        if (flag) {
            const token = user.getJWTToken();
            res.status(200).json({ success: true, message: "you have loggedIn succesfully", token });
        }
    }

}