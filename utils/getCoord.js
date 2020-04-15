const request = require('request');

function getCoord(res, city, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        city)}.json?access_token=${process.env.MAPBOX}`
    request({ url: url, json: true }, (error, { body }) => { //json:true => parse to json object
        if (error){
            console.log(error)
            return res.render('weather', {error: 'There is a problem with fetching your location'})
        }
        //else
        if(body.features && body.features.length ===0){
            return res.render('weather', {error: 'We cannot find your location. Please use another location.'})
        }
        const [lng, lat] = body.features[0].geometry.coordinates //use deconstructive es6 to get lng and lat
        console.log(lng, lat)

        callback(res, city, lng, lat) //i gotta pass city alll the way to getWeather cuz that's where I render the weather template
    })
}

module.exports = getCoord;