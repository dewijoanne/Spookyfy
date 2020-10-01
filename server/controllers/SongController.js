const {Song} = require('../models');

class SongController {

    static findAll(req,res,next) {
        Song.findAll({
            where:{
                user_id:req.userData.id
            }
        })
        .then(songs => {
            res.status(200).json({songs})
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = SongController;