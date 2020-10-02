const errorHandler = (err, req, res, next) => {  
    let errors = []
    let code = 500

    switch(err.name) {
      case 'SequelizeValidationError':
        err.errors.forEach(error => errors.push(error.message))
        code = 400
        break;
      case 'SequelizeUniqueConstraintError':
        errors.push(`this email has been used`);
        statusCode = 400;
        break;
      case 'JsonWebTokenError':
        errors.push(`you do not have access to this page`);
        statusCode = 401;
        break;
      default:
        errors.push(err.msg);
        code = err.code || 500
  }
  
    res.status(code).json({errors});
  }
  
  module.exports = errorHandler


