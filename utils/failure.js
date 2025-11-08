class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }
}

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value} `;
    return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProduction = (err, res) => {
    //Operational, trusted error
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        //Programming or other unknown errors
        console.error('Error', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong !'
                });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if(process.env.NODE_ENV == 'production'){
        let error = {...err};
        error.message = err.message;

        if(err.name === 'CastError') error = handleCastErrorDB(error);
        if(err.code === 11000) error = handleDuplicateFieldDB(error);
        if(err.name === 'ValidationError') error = handleValidationErrorDB(error);
        if(err.name === 'JsonWebTokenError') error = handleJWTError();
        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProduction(error, res);
    }   
};

module.exports = {
    AppError,
    globalErrorHandler
};
