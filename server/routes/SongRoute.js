const route = require('express').Router();
const { Router } = require('express');
const SongController = require('../controllers/SongController');
const authentication = require('../middlewares/authentication');
const axios = require('axios')

// route.use(authentication);
route.get('/',SongController.findAll);
route.post('/',SongController.create);
route.delete('/:id',SongController.delete);



route.get('/:artist/:songname', (req, res, next) => {
    const { artist, songname } = req.params
    axios({
        method: 'GET',
        url: `https://api.lyrics.ovh/v1/${artist}/${songname}`
    })
     .then(response => {
         const lyrics = response.data
         res.status(200).json({
             lyrics
         })
     })
     .catch(err => next(err))
})

module.exports = route;