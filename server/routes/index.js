const route = require('express').Router();
const UserController = require('../controllers/UserController');
const SongController = require('../controllers/SongController');

route.post('/users/register',UserController.create);
route.post('/users/login',UserController.login);

module.exports = route;