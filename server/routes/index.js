const route = require('express').Router();
const UserController = require('../controllers/UserController');
const SongRoute = require('./SongRoute');

route.post('/users/register',UserController.create);
route.post('/users/login',UserController.login);
route.use('/songs',SongRoute);

module.exports = route;