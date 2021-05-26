var 

function getWeather() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=acf0f53f45fba2ae88e8738d6caadbe5"

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()

            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            alert('404 - getWeather func');
        });
};

function getFiveDay() {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=acf0f53f45fba2ae88e8738d6caadbe5"

    fetch(fiveDayURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()

            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            alert('404 - getFiveDay func');
        });
};