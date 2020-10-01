const {User} = require('../models');
const {comparePass} = require('../helpers/bcrypt');
const {genToken} = require('../helpers/jwt');

class UserController {
    
    static create(req,res,next) {
        const {name,email,password} = req.body;
        const newObj = {name,email,password};

        User.create(newObj)
        .then(user => {
            res.status(201).json({msg:'successfully create new user'});
        })
        .catch(err => {
            next(err);
        })
    }

    static login(req,res,next) {
        User.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user => {
            if(!user) {
                throw ({msg:`invalid email or password`,code:401});
            }
            let comparison = comparePass(req.body.password,user.password);
            if(!comparison) {
                throw ({msg:`invalid email or password`,code:401})
            }
            let payload = {
                id:user.id,
                email:user.email
            }
            let token = genToken(payload);
            res.status(200).json({token});
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserController;