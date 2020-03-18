const request = require('request');

const forecast = (latitide, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/87389f9a7e668a1f9ba6ed7a0a30f0d0/'+ latitide + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain. Temperature high ' + body.daily.data[0].temperatureHigh + ', temperature low ' + body.daily.data[0].temperatureLow);
        }
    });
}

module.exports = forecast;