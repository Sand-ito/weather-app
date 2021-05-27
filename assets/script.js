var buttonEl = document.querySelector('#btn');
var buttonHistory = document.querySelector('#button-history')
var inputEl = document.querySelector('#search-bar');
var cityName = document.querySelector('.city-name');
var currentConditionsListEl = document.querySelector('.curret-conditions');
var currentTemp = document.querySelector('.uv-index');
var currentHumidity = document.querySelector('.uv-index');
var current = document.querySelector('.uv-index');
var uvIndex = document.querySelector('.uv-index');
var key = "&appid=acf0f53f45fba2ae88e8738d6caadbe5";
var imperial = "&units=imperial";
var searchHistory = JSON.parse(localStorage.getItem('history')) || [];

function clearHistory() {
    while(buttonHistory.firstChild) {
        buttonHistory.removeChild(buttonHistory.firstChild);
    }
};

function renderHistory() {
   clearHistory();

   searchHistory.forEach(function(currentValue, index, array) {
      var newButton = document.createElement('button')
      buttonHistory.appendChild(newButton);
      newButton.innerHTML = currentValue

   })
};

function getWeather() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.value + imperial + key;

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } 
            else {
                alert('Error: ' + response.statusText + '. \nPerhaps you misspelled the city name, or we do not have it in our database. Please try again.');
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
                    console.log(uvidata.current.uvi);
                    uvIndex.innerHTML = "UV Index: " + uvidata.current.uvi
                })
        })
};

function getFiveDay() {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl.value + imperial + key;

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
    cityName.innerHTML = inputEl.value
    searchHistory.push(inputEl.value)
    localStorage.setItem('history', JSON.stringify(searchHistory));
    // update interface
    renderHistory();
    getWeather();
    getFiveDay();
})