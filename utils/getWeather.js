const request = require('request');
const moment = require('moment');

//ERR: cannot set headers after they are sent to the client, you should only send a req once

/* NTS: Recap of what I did here to get the temp for 24 hours:
 * Need to add time parameter in the API request
 * API docs says you either need the time in UNIX or a string? I picked UNIX
 * Created a variable hourly which holds the hourly data
 * Created a function getTimes() to map through the hourly data and return an array
   objects which contains time and temp values ex: {time: 12:00:00 AM, temp: 77.7}
 * Pass this array to the weather.hbs file w/ res.render
 * Then I used the each helper to iterate over the array and displayed the data
*/

function getWeather(res, city, lng, lat) {

    //Get timestamp in seconds for the API time request parameter
    var now = Math.floor(Date.now() / 1000)
    console.log(now)

    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lng},${now}`
    request({ url: url, json: true }, (error, { body }) => { //2 elements: url+json:true and callbackfunction w 2 args network error and body
        if (error) {
            console.log(error) //log error from api to terminal
            return res.render('weather', { error: 'There is a problem with fetching your location' }) //let user know there was an error, pass error to weather template
        }

        daily = body.daily;
        data = daily.data[0]; // NTS: data is an array
        low = data.temperatureLow 

        hourly = body.hourly.data

        //get array of times and temperatures
        function getTimes() {
            a = [];
            for (i = 0; i < hourly.length; i++) {
                //var timestamp = moment.unix(hourly[i].time); tried to use moment here but dude on stackexchange said to use native methods instead
                //Convert from Unix timestamp back to regular time. NTS: Multiply by 1000 first.
                var timestamp = new Date(hourly[i].time * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})
                a.push({time: timestamp, temp: hourly[i].temperature})
            }
            return a;
        }
        
        times = getTimes();

        //render the /weather page with data from the object in the second argument
        return res.render('weather', {
            ...body['currently'], data: data, city: city, hourly: hourly, times: times //note to self: data is the dailydata
        })
    })
}

module.exports = getWeather;