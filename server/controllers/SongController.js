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

    static create(req,res,next) {
        const {title,artist,album,preview,lyrics,picture} = req.body;
        const newObj = {title,artist,album,preview,lyrics,picture,user_id:req.userData.id};

        Song.create(newObj)
        .then( (song) => {
            res.status(201).json({song})
        })
        .catch (err => {
            next(err)
        })
    }

    static delete(req,res,next) {
        Song.findByPk(req.params.id)
        .then(song => {
            if(!song) throw ({msg:'song not found',code:404})
            song.destroy()
            res.status(200).json({msg:'successfully deleted the song'})
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = SongController;