const {vefToken} = require('../helpers/jwt');
const {User} = require('../models');

async function authentication(req,res,next) {
    try {
        let verified = vefToken(req.headers.token);
        let user = await User.findOne({
            where:{
                email:verified.email
            }
        })
        if(!user) throw ({msg:'authentication failed',code:403})
        req.userData = verified;
        next();

    } catch(err) {
        next(err);
    }
}
module.exports = authentication;