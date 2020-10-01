const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
  
    let errors = []
    let statusCode = 500
  
    switch(err.name) {
              case 'SequelizeValidationError':
                err.errors.forEach(error => errors.push(error.message))
                statusCode = 400
                break
                default:
                  errors.push('Internal server error')
                  statusCode = err.code || 500
    }
  
    res.status(statusCode).json({
      errors:errors
    })
  }
  
  module.exports = errorHandler


