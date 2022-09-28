const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
        maxLength: [20, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, "Please enter valid Email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false,
    },
    profilePic: {
        image: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please enter Phone Number"]
    },
    date: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("user pre function")
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    // next();
})


userSchema.methods.getJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    return token;
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex")

    // setting reset token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // settng token expire
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

userSchema.methods.changePassword = function (newpassword) {
    this.password = newpassword;
}

module.exports = mongoose.model("user", userSchema);