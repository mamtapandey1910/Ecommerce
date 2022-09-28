const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");

// user Registration
exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
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
    if (!flag) {
        return next(new ErrorHandler(401, "Please enter correct login Id and password"));
    }
    sendToken(user, 200, res);
});


// get my profileDetails
exports.getMyProfileDetails = catchAsyncErrors(async (req, res, next) => {
    const createdProduct = await Product.find({ user: req.user.id })
    res.status(200).json({ success: true, userProfile: req.user, createdProduct })

})

//update Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    // console.log(user.password)
    const flag = await bcrypt.compare(req.body.oldpassword, user.password);

    if (!flag) {
        return next(new ErrorHandler(400, "Old password is wrong"))
    }

    if (req.body.newpassword !== req.body.confirmpassword) {
        return next(new ErrorHandler(400, "Password does not match"))
    }

    user.changePassword(req.body.newpassword)
    await user.save()
    res.status(200).json({ success: true, message: "Password changed succesfully" });
})


// update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const updatedDetails = { ...req.body };

    if (req.body.email) {
        return next(new ErrorHandler(400, "Email cannot be updated"))
    }
    const user = await User.findByIdAndUpdate(req.user.id, updatedDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, message: "Profile updated succesfully" })
})


//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        next(new ErrorHandler(404, "User not found"))
    }
    const savedTokenUser = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetpasswordurl = `${req.protocol}://${req.get("host")}/api/user/login/${savedTokenUser}`;
    const message = `Your reset password token is \n\n ${resetpasswordurl}. \n\n If you have not requested this, please ignore.`

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Pecovery",
            message
        })
        console.log("mail sent")
        res.status(200).json({ success: true, message: "Mail sent successfully" })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })

        if (err) {
            console.log(err)
            next(new ErrorHandler(500, "Some error occured"))
        }
    }
})


/// Get all users ------> Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const allUsers = await User.find();
    if (allUsers.length === 0) {
        res.status(200).json({ success: true, message: "No user found" })
    }
    res.status(200).json({ success: true, users: allUsers })
})


// Get single user details  ------> Admin
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler(404, "User not found"));
    }

    res.status(200).json({ success: true, user })
})


// update user role -----> Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const updatedDetails = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, updatedDetails, {
        new: false,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({ success: true, message: "User updated succesfully" })
})


// delete user ----------> Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: "User deleted succesfully" })
})


//User logout
exports.userLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        HttpOnly: true
    })

    // const token = req.header("token")
    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    })
})