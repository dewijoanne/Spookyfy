const route = require('express').Router();
const UserController = require('../controllers/UserController');
const SongRoute = require('./SongRoute');
const WeatherRoutes = require('./WeatherRoute');

route.post('/users/register',UserController.create);
route.post('/users/login',UserController.login);
route.post('/users/googleSign',UserController.googleSign)
route.use('/songs',SongRoute);
route.use('/weathers',WeatherRoutes);

module.exports = route;