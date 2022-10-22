const ErrorHandler = require("../utils/errorHandler");


// FIXME fix error not show in production mode
// like show profile if not login

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    // err.message = err.message || 'internal server error';
    if (process.env.NODE_ENV === "DEVELOPMENT")
    {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        });
    };



    if (process.env.NODE_ENV === "PRODUCTION")
    {
        let error = { ...err };
        error.message = err.message;
        // handle wrong mongoose object id
        if (err.name === "CastError")
        {
            const message = `الموارد غير موجود. غير صالحة ${err.path}`
            error = new ErrorHandler(message, 400);

        }
        // handle mongoose validate error
        if (err.name === "ValidationError")
        {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400);

        }
        // handle mongoose duplicate key  error
        if (err.code === 11000)
        {
            const message = `حقل العنصر هذا موجود بالفعل`;
            error = new ErrorHandler(message, 400);

        }

        // handle jwt  error
        if (err.name === "JsonWebTokenError")
        {
            const message = 'رمز الويب JSON غير صالح'
            error = new ErrorHandler(message, 400);

        }
        // handle Expire token  error
        if (err.name === "TokenExpiredError")
        {
            const message = 'انتهت صلاحية رمز الويب JSON المميز'
            error = new ErrorHandler(message, 400);

        }


        res.status(error.statusCode).json({
            success: false,
            error: error.message || 'خطأ في الخادم الداخلي'
        });

    };
};



