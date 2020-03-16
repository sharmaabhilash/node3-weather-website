const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); // 'view engine' should be exact same as written here.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    // 'index' is the nameof hbs and after that object is containing dynamic information to show on page.
    res.render('index', {
        title: 'Weather',
        name: 'Abhilash'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhilash'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How can I help you?',
        name: 'Abhilash'
    });
});

// forward slash '/' is important
// app.get('/help', (req, res) => {
//     //res.send('Hepl page!');
//     res.send({
//         name: 'Abhilash',
//         age: 27
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('<h2>About page</h2>');
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address;

    geocode(address, (errors, { latitude, longitude, location } = {}) => {
        if (errors) {
            return res.send({
                error: errors
            });
        }
        else {
            forecast(latitude, longitude, (errors, forecastData) => {
                if (errors) {
                    return res.send({
                        error: errors
                    });
                }
                else {
                    return res.send({
                        forecast: forecastData,
                        location: location,
                        address: address
                    })
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        title: '404',
        error: 'Help article not found',
        name: 'Abhilash'
    });
});

app.get('*', (req, res) => {
    res.render('404-error', {
        title: '404',
        error: 'Page not found',
        name: 'Abhilash'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running');
});