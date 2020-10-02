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
        headers: {Authorization : 'Bearer BQC3I_mp7MrMX175A5zbhUeix2lh6AgKwvrdcQWxEePJS3WZ0tuN6NUYwzOTR-gSCOfTr9miIwz_lvdjaKwDmo1fr9X-t_iQ7YtTLq7c2PLT7pN13CXghVZ0d9me8otiXLyzDaYq9v3S4Kuy_5x_ufBCEHqzm8PN4DzdxqSfIsqqI_y7WmEJICMaTWK_ubzgusYj7bfJnovtKkrAc-wWxOJoBamnS4IX9zGl3bcnXiTLW2Mhe3WIBqbc9qR_JH3jm-RqzSDZqLUPbC6QHA92DvEioh2et4pIVEk"'} ,
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