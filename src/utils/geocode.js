const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaWxhc2gtcyIsImEiOiJjazZ5czRybmcwNHdsM2RsM21hZjQ1aWxmIn0.yfSYv7MAgydEuczPgO4WIw&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        }
        else if (body.features.length <= 0) {
            callback('Unable to find location! Try with another address', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;