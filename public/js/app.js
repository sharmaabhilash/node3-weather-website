const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const pLocation = document.querySelector('#location');
const pForecast = document.querySelector('#forecast');
const pError = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    pError.textContent = '';
    pLocation.textContent = '';
    pForecast.textContent = '';
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                pError.textContent = data.error;
            }
            else {
                pLocation.textContent = data.location;
                pForecast.textContent = data.forecast;
            }
        }, (error) => {
            console.log(error);
        })
    })
})