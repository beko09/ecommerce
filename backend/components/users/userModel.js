const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الرجاء ادخال الاسم'],
        maxLength: [30, 'الاسم يجب ان لايتعدي 30 حرفا']
    },
    email: {
        type: String,
        required: [true, 'الرجاء ادخال الايميل'],
        unique: [true, 'هذا الايميل مسجل مسبقا'],
        validate: [validator.isEmail, 'الرجاء ادخال ايميل صحيح']
    },
    password: {
        type: String,
        required: [true, 'الرجاء ادخال كلمة السر'],
        minLength: [6, 'كلمة السر يجب ان تكون اكثر من 6 حروف'],
        select: false
    },
    avatar: {
        path: {
            type: String,
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    restPasswordExpire: Date
});


// encrypt password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// return jwt token 

userSchema.methods.getJwtToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// generate resetPasswordToken 

userSchema.methods.getResetPasswordToken = function () {
    // generate token
    const restToken = crypto.randomBytes(20).toString("hex");

    // hash and rest resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(restToken).digest('hex');

    // set token expire
    this.restPasswordExpire = Date.now() + 30 * 60 * 1000;
    return restToken;
}



const User = mongoose.model("User", userSchema);
module.exports = User;
