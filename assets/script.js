var buttonEl = document.querySelector('#btn');
var buttonHistory = document.querySelector('#button-history')
var inputEl = document.querySelector('#search-bar');
var cityName = document.querySelector('.city-name');
var currentConditionsListEl = document.querySelector('.curret-conditions');
var currentTemp = document.querySelector('.temp');
var currentHumidity = document.querySelector('.humidity');
var currentWind = document.querySelector('.wind');
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
      var newButton = document.createElement('button');
      buttonHistory.appendChild(newButton);
      newButton.innerHTML = currentValue;

   })
};

function getWeather() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.value + imperial + key;

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } 
            else {
                alert('Error: ' + response.statusText + '. \nPerhaps you misspelled the city name, or we do not have it in our database. Please try again.');
            }
        })
        .then(function (data) {
            console.log(data);
            
            currentTemp.innerHTML = "Temp: " + data.main.temp + "F";
            currentHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
            currentWind.innerHTML = "Wind: " + data.wind.speed + "MPH";

            var uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + key;
            

            fetch(uviURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvidata) {
                    uvIndex.innerHTML = "UV Index: " + uvidata.current.uvi;

                    if (parseInt(uvidata.current.uvi) > 8){
                        uvIndex.classList = "bad";
                    }  else if (parseInt(uvidata.current.uvi) >= 2 && parseInt(uvidata.current.uvi) < 8){
                        uvIndex.classList = "moderate";
                    } else {
                        uvIndex.classList = "safe";
                    }
                    
                })
        })
};

function getFiveDay() {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl.value + imperial + key;

    fetch(fiveDayURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            var dateDay1 = document.querySelector('.date-day-1');
            var tempDay1 = document.querySelector('.temp-day-1');
            var windDay1 = document.querySelector('.wind-day-1');
            var humidityDay1 = document.querySelector('.humidity-day-1');

            date1 = new Date(data.list[0].dt * 1000);
            dateDay1.innerHTML =  date1.toDateString();
            tempDay1.innerHTML = "Temp: " + data.list[0].main.temp + "F";
            windDay1.innerHTML = "Wind: " + data.list[0].wind.speed + "MPH";
            humidityDay1.innerHTML = "Humidity: " + data.list[0].main.humidity + "%";

            var dateDay2 = document.querySelector('.date-day-2');
            var tempDay2 = document.querySelector('.temp-day-2');
            var windDay2 = document.querySelector('.wind-day-2');
            var humidityDay2 = document.querySelector('.humidity-day-2');

            date2 = new Date(data.list[8].dt * 1000);
            dateDay2.innerHTML =  date2.toDateString();
            tempDay2.innerHTML = "Temp: " + data.list[8].main.temp + "F";
            windDay2.innerHTML = "Wind: " + data.list[8].wind.speed + "MPH";
            humidityDay2.innerHTML = "Humidity: " + data.list[8].main.humidity + "%";

            var dateDay3 = document.querySelector('.date-day-3');
            var tempDay3 = document.querySelector('.temp-day-3');
            var windDay3 = document.querySelector('.wind-day-3');
            var humidityDay3 = document.querySelector('.humidity-day-3');

            date3 = new Date(data.list[16].dt * 1000);
            dateDay3.innerHTML =  date3.toDateString();
            tempDay3.innerHTML = "Temp: " + data.list[16].main.temp + "F";
            windDay3.innerHTML = "Wind: " + data.list[16].wind.speed + "MPH";
            humidityDay3.innerHTML = "Humidity: " + data.list[16].main.humidity + "%";

            var dateDay4 = document.querySelector('.date-day-4');
            var tempDay4 = document.querySelector('.temp-day-4');
            var windDay4 = document.querySelector('.wind-day-4');
            var humidityDay4 = document.querySelector('.humidity-day-4');

            date4 = new Date(data.list[24].dt * 1000);
            dateDay4.innerHTML =  date4.toDateString();
            tempDay4.innerHTML = "Temp: " + data.list[24].main.temp + "F";
            windDay4.innerHTML = "Wind: " + data.list[24].wind.speed + "MPH";
            humidityDay4.innerHTML = "Humidity: " + data.list[24].main.humidity + "%";

            var dateDay5 = document.querySelector('.date-day-5');
            var tempDay5 = document.querySelector('.temp-day-5');
            var windDay5 = document.querySelector('.wind-day-5');
            var humidityDay5 = document.querySelector('.humidity-day-5');

            date5 = new Date(data.list[32].dt * 1000);
            dateDay5.innerHTML =  date5.toDateString();
            tempDay5.innerHTML = "Temp: " + data.list[32].main.temp + "F";
            windDay5.innerHTML = "Wind: " + data.list[32].wind.speed + "MPH";
            humidityDay5.innerHTML = "Humidity: " + data.list[32].main.humidity + "%";
        });
};

buttonEl.addEventListener('click', function (event) {
    event.preventDefault();
    cityName.innerHTML = inputEl.value;
    searchHistory.push(inputEl.value);
    localStorage.setItem('history', JSON.stringify(searchHistory));
    renderHistory();
    getWeather();
    getFiveDay();
})