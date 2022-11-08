const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleWare = (err, req, res, next ) => {
    const customError ={
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, 
        msg : err.message || 'Something went wrong, please try again later'
    }
    if(err.code && err.code === 11000){
        customError.statusCode = StatusCodes.BAD_REQUEST, 
        customError.msg = `email ${err.keyValue.email} is already in use , please choose another email`
    }
    if(err.name && err.name === 'CastError'){
        customError.msg = `No job found with the id : ${err.value}`,
        customError.statusCode= StatusCodes.NOT_FOUND
    }
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map(val => val.message).join(',');
    }
    return res.status(customError.statusCode).json({msg :customError.msg});
}

module.exports = errorHandlerMiddleWare;