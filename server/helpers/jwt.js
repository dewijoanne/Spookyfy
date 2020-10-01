const jwt = require('jsonwebtoken');

function genToken(payload) {
    return jwt.sign(payload,"secret")
}

function vefToken(token) {
    return jwt.verify(token,"secret")
}

module.exports = {genToken,vefToken};