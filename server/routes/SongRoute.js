const route = require('express').Router();

const SongController = require('../controllers/SongController');
const authentication = require('../middlewares/authentication');
const axios = require('axios')

route.use(authentication);
route.get('/',SongController.findAll);
route.post('/',SongController.create);
route.delete('/:id',SongController.delete);



route.get('/search/:track', (req, res, next) => {
    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = 'Bearer BQA1X7Ay7CwNYGOn6ZpJlZxQp3FmlB4UXEV2tAvp0FD8N_4tty2BBskGS4I9OCz68edZY4dRPP-zsROwvm2ytdjOKJA22RR9oblnyHikbQvQAq8LxsAk3_vIMeDcOQIRdNCJsLBPTMD1F4XRU91V2OwUcEmYkyxNvbL7ERGnUtcVnMsoXL5t0rZpbkNaxFB9UQVY_E61pfXFTkgdridr2ZF9IzKyFaH1os68BfgltZGmaQ1aybH8URf3x8II9SC2UEdDA0P72vnxE6P1YBx9jvDgI6-yUSCIrrQ"';
            return config
        },
        error => {
            return Promise.reject(error);
        }
    )
    const { track } = req.params
    axios({
        method: 'GET',
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