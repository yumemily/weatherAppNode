var express = require('express');
var router = express.Router();
const getCoords = require('../utils/getCoord');
const getWeather = require('../utils/getWeather')

// * How to Call API
// * How to render hbs
// * How to manage routes
// * Chain functions
// * Error handling
// localhost:5000/users/
router.get('/weather', function (req, res) {
  const query = req.query;
  console.log(query)
  //use the city name to get geo coords
  if (!query.city) {
    return res.redirect('/')
  }
  getCoords(res, query.city, getWeather, {hbs: "weather"});


  //chain 2 functions w a callback getCoords triggers the callback fx getWeather
  //use coordinates to fetch weather

  //we render the template inside getCoords
  // res.render('weather',{city: query.city, getWeather})
})

/* GET home page. */
router.get('/', function (req, res, next) {
  const { lng, lat } = req.query
  if (lng && lat) {
    return getWeather(res, null, lng, lat, { hbs: "index", title: "Em's Weather App" }) // this is so bad, passsing too many things . Normally you want to pass title for every hbs page. If you look at real website, the title change depends on each route's content.
  } else {
    res.render('index', { title: "Em's Weather App" });
  }
});

router.get('*', function (req, res, next) {
  res.render('index', { error: '404 not found' });
});

module.exports = router;
