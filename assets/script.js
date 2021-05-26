var buttonEl = document.querySelector('#btn')
var inputEl = document.querySelector('#search-bar')
var key = "&appid=acf0f53f45fba2ae88e8738d6caadbe5"


function getWeather() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.value + key;

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()

            } else {
                alert('Error: ' + response.statusText + '. Perhaps you misspelled the city name, or we do not have it in our database. Please try again.');
            }
        })
        .then(function (data) {
            console.log(data);
            var uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + key;
            fetch(uviURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvidata) {
                    console.log(uvidata);
                    console.log(uvidata.current.uvi);
                })
        })
};

function getFiveDay() {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl.value + key;

    fetch(fiveDayURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()

            }
        })
        .then(function (data) {
            console.log(data);
        })
};

buttonEl.addEventListener('click', function (event) {
    event.preventDefault();
    getWeather();
    getFiveDay();
})