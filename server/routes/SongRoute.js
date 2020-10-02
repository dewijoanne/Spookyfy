const route = require('express').Router();

const SongController = require('../controllers/SongController');
const authentication = require('../middlewares/authentication');
const axios = require('axios')

route.use(authentication);
route.get('/',SongController.findAll);
route.post('/',SongController.create);
route.delete('/:id',SongController.delete);



route.get('/search/:track', (req, res, next) => {
    const { track } = req.params
    axios({
        method: 'GET',
        headers: {Authorization : 'Bearer BQDngdPoMWO1XeJ6YUlfdH95qG7DMoW3w1cU86VQYws_ihjRRb9kcL0Kd8N8jOMIXH5QI8Q0fCvKPDaPwLVDdImI4_i1571gTqInHYYlDfxO73gaLJi0Ikrv9kXfDa37kqJaBPORAhC7X1HK6pkuIQnkO50XfGFIT3GpZ5cd94Z-VItKesib8t9T_j79tpug45B4uEO2sTrfZLgWPdsH3QMWPZ9MlM8_gPT9GseXHBGhpoelYdUgwgFbeXV5hx4AwjcZduoC0sbdXCJjWRR-uKD6Rwq6L1xS4cA"'} ,
        url: `https://api.spotify.com/v1/search?q=${track}&type=track&market=ID`
    })
     .then(response => {
         const musicData = response.data.tracks.items[0];
         res.status(200).json({
             musicData
         })
     })
     .catch(err => next(err))
})

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