const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    //console for developer
    let error = {...err};
    error.message = err.message;
    console.log(err.stack.red.bold);
    //console.log(err.name);to find what type of error is this....

    //mongoose bad object id
    if(err.name === 'CastError'){
        const message = `post not found with id of ${err.value}`
        error = new ErrorResponse(message, 404);
    }
    if(err.code === 11000){
        const message = 'Duplicated field value entered'
        error = new ErrorResponse(message, 400);
    }    
    if(err.code === 'ValidationError'){
        const message = Object.values(err.error).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }    
 
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'server error'
    });
};

module.exports = errorHandler;