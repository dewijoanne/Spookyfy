const bcrypt = require('bcryptjs');

function hashPass(pass) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass,salt);
}

function comparePass(pass,hashed) {
    return bcrypt.compareSync(pass, hashed);    
}

module.exports = {hashPass,comparePass};