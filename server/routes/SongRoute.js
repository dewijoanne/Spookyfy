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
            config.headers.Authorization = 'Bearer BQCmZK_3fBGUdps74XUSmhAa3bmv1OKB1KLtIq6_1wFPIj8VQdSEyJMvnsSXIusgX86GAH4E0C5m38ofNi0Pug-B6ITSjZTObDf0XMwcZfy8TV-786DY6hMbjB-pt_8DpJvEFrIN-sndx5SBO02Cioy6BaVO9o2uoGGGZIdLgU9zM07VYHlyUkLK5-WAgufCK_d9_1ANLKlru6ZAPnrneOGiT17nLBvBjbWb2qnBYaBbLvU0-Eae0EJVEiXkX5jNPIS3G_h5bb9yViry4Ve_j5_hMx-1KDZVyR8"';
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
         const musicData = response.data.tracks.items
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