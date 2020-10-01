const route = require('express').Router();
const SongController = require('../controllers/SongController');
const authentication = require('../middlewares/authentication');

route.use(authentication);
route.get('/',SongController.findAll);
route.post('/',SongController.create);
route.delete('/:id',SongController.delete);


module.exports = route;