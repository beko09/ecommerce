const User = require("./userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const fs = require('fs')
const path = require('path')


// register user

const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    //check email and password is entered
    if (!name || !password || !email)
    {
        return next(new ErrorHandler({
            name: 'الرجاء ادخال الاسم',
            email: 'الرجاء ادخال الايميل',
            password: 'الرجاء ادخال كلمة السر'
        }, 400));
    }

    const newDataRegister = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const emailUser = await User.findOne({ email: req.body.email });

    if (emailUser && emailUser.email === req.body.email)
    {
        return next(new ErrorHandler(`الايميل مستخدم مسبقا`, 403));
    }
    if (req.file && req.file !== ' ' && req.file !== null)
    {
        newDataRegister.avatar = {
            path: req.file.path || null,
            url: req.protocol + "://" + req.get('host') + "/" + req.file.path || null
        }
    }

    const user = await User.create(newDataRegister);
    sendToken(user, 201, res);
});

// login user

const login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;
    //check email and password is entered
    if (!email || !password)
    {
        return next(new ErrorHandler({
            email: 'الرجاء ادخال الايميل',
            password: 'الرجاء ادخال كلمة السر'
        }, 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user && user === null)
    {
        return next(new ErrorHandler(
            {
                email: 'لايوجد مستخدم بهذا الايميل'
            }, 401));
    }

    // check if password correct or not
    const passwordIsMatch = await user.comparePassword(password);
    if (!passwordIsMatch)
    {
        return next(new ErrorHandler({
            password: 'كلمة سر غير صالحة'
        }, 401));
    }
    sendToken(user, 200, res);

});

// forgot password

const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
    {
        return next(new ErrorHandler({
            email: 'لا يوجد مستخدم بهذا الايميل'
        }, 404));
    }

    // get reset token

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // create reset url

    // const resetUrl = `${req.protocol}s://${req.get("host")}/users/password/reset/${resetToken}`;
    const resetUrl = `http://localhost:3000/users/password/reset/${resetToken}`;

    const message = `<h2 style="dir:rtl">رمز اعادة استرجاع كلمة المرور اتبع الرابط : </h2>
     <p style="dir:rtl">
     <a href="${resetUrl}">اضغط هنا</a>
     </p>
     <p>
     انسخ الرابط وافتحه في المتصفح
     ${resetUrl}
     </p>
   <span style="dir:rtl">
   اذا لم ترسل هذا الايميل يجب ان تهمله
   </span>`;

    try
    {
        await sendEmail({
            email: user.email,
            subject: "استرجاع كلمة السر |  تسوق",
            message
        });
        res.status(200).json({
            success: true,
            message: `تم ارسال رسالة الي : : ${user.email}`
        })

    } catch (err)
    {
        user.resetPasswordToken = undefined;
        user.restPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500));
    }


});


// reset password

const resetPassword = catchAsyncError(async (req, res, next) => {

    // hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        restPasswordExpire: { $gt: Date.now() }
    });
    if (!user)
    {
        return next(new ErrorHandler('رمز إعادة تعيين كلمة المرور غير صالح أو انتهت صلاحيته'
            , 400));
    }
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword)
    {
        return next(new ErrorHandler(
            {
                password: 'كلمة السر غير متطابقة'
            }, 400));
    }
    // step new  password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.restPasswordExpire = undefined;
    await user.save()
    sendToken(user, 200, res);


})


// profile user 
const profile = catchAsyncError(async (req, res) => {

    // TODO  return specified data not all data
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

// update password when logged
const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // const { oldPassword, password } = req.body;

    // check previous password is match
    const isMatched = await user.comparePassword(req.body.oldPassword);


    if (!isMatched)
    {
        return next(new ErrorHandler({
            oldPassword: 'كلمة سر قديمة ليست صحيحة'
        }, 400));
    }

    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
});


// update profile
const updateProfile = catchAsyncError(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email
    }


    if (req.file !== '' && req.file !== null && req.file)
    {
        const user = await User.findById(req.user.id);
        if (user.avatar.path)
        {
            const pathImg = user.avatar.path;
            fs.unlink(`${pathImg}`, (err) => {
                console.log(err)
            })
        }
        newData.avatar = {
            path: req.file.path || null,
            url: req.protocol + "://" + req.get('host') + "/" + req.file.path || null
        }

    }
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})


// logout
const logout = catchAsyncError(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(
            Date.now()
        ),
        httpOnly: true

    })
    res.status(200).json({
        success: true,
        message: "logged out"
    })

});


// get all user by  admin 

const allUsers = catchAsyncError(async (req, res, next) => {
    const userPerPage = 8;
    const usersCount = await User.countDocuments();
    const currentPage = Number(req.query.page) || 1;
    const skip = userPerPage * (currentPage - 1);
    const users = await User.find().sort({ $natural: -1 }).limit(userPerPage).skip(skip);



    // const users = await User.find().sort({ $natural: -1 });

    res.status(200).json({
        success: true,
        userPerPage,
        usersCount,
        users
    })
})


// get user detail by admin
const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user)
    {
        return next(new ErrorHandler(`لا يوجد مستخدم بهذا ال: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })


})


// update user by admin
const updateUser = catchAsyncError(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })

})

// delete user
const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user)
    {
        return next(new ErrorHandler("المستخدم غير موجود", 404));
    };

    if (user.avatar.path)
    {
        const pathImg = user.avatar.path;

        fs.unlink(`${pathImg}`, (err) => {
            console.log(err)
        })
    }

    await user.remove();
    res.status(200).json({
        success: true,
        message: "تم مسح المستخدم"
    });
});

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    profile,
    updatePassword,
    updateProfile,
    allUsers,
    getUser,
    updateUser,
    deleteUser
};