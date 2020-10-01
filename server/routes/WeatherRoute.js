const route = require('express').Router();
const axios = require('axios');

route.get('/',(req,res,next) => {
    let city = null;
    let weatherData = null;
    axios({
        method: 'GET',
        url: `https://ipinfo.io?token=4d473ff0435e1f`
      })
    .then(response =>{
        city = response.data.city;
        console.log(city);
        
        return axios({
            method:'GET',
            url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca6bfb642b4c79ec6acdbbe25d82db3b`
        })
    })
    .then(response => {
        weatherData = response.data
        console.log(weatherData);
        res.status(200).json({weatherData});
    })
    .catch(err => next(err));
})

/*
bentuk weather data nanti 
{
  coord: { lon: 106.85, lat: -6.21 },
  weather: [
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }
  ],
  base: 'stations',
  main: {
    temp: 303.12,
    feels_like: 305.09,
    temp_min: 302.15,
    temp_max: 304.26,
    pressure: 1008,
    humidity: 66
  },
  visibility: 6000,
  wind: { speed: 4.6, deg: 100 },
  clouds: { all: 20 },
  dt: 1601557683,
  sys: {
    type: 1,
    id: 9383,
    country: 'ID',
    sunrise: 1601505444,
    sunset: 1601549216
  },
  timezone: 25200,
  id: 1642911,
  name: 'Jakarta',
  cod: 200
}
*/


module.exports = route;