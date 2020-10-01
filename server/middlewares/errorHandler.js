function errorHandler(err,req,res,next) {
    let errors = [];
    let code = 500;

    switch(err.name) {
        case 'SequelizeValidationError':
        

        default:
            errors.push(err.msg);
            code = err.code || 500;
    }
    res.status(code).json({errors})
}

module.exports = errorHandler;