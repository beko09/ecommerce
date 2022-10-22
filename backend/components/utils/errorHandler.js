//  error handler class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.message = message;
        if (Error.captureStackTrace)
        {
            Error.captureStackTrace(this, this.constructor);
        }
    };
};

module.exports = ErrorHandler;