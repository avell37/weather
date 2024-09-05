const humidity = document.querySelector('.weather-info-details-hum'),
      temperature = document.querySelector('.weather-info-c'),
      wind = document.querySelector('.weather-info-details-wind'),
      weatherImg = document.querySelector('.weather-info-img'),
      description = document.querySelector('.weather-info-text'),
      inputCity = document.querySelector('.inputType'),
      imgSearch = document.querySelector('.timg');

let city = '';

inputCity.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        city = inputCity.value.trim();
        fetchAndDisplayWeather(city);
        inputCity.value = '';
    }
});

imgSearch.addEventListener('click', function(event) {
    event.preventDefault();
    city = inputCity.value.trim();
    fetchAndDisplayWeather(city);
});

async function fetchWeatherCity(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=528160383f63451f82502642240807&q=${city}`);
        if (!response.ok) {
            throw new Error(`Error! STATUS: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};


function fetchAndDisplayWeather(city) {
    if (city) {
        fetchWeatherCity(city).then(data => {
            displayWeather(data);
        }).catch(error => {
            console.error('Error fetching weather data:', error);
        })
    }
}

if (inputCity && inputCity.value.trim()) {
    fetchAndDisplayWeather(inputCity.value.trim());
}

function displayWeather(response) {
    let image = weatherImg;
    switch (response.current.condition.text) {
        case 'Sunny':
            image.src = 'images/sun.png';
            image.classList.add('weather-info-img');
            break;
        case 'Mist':
            image.src = 'images/mist.png';
            image.classList.add('weather-info-img');
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            image.classList.add('weather-info-img');
            break;
        case 'Clear':
            image.src = 'images/clouds.png';
            image.classList.add('weather-info-img');
            break;
        case 'Light rain':
            image.src = 'images/rain.png';
            image.classList.add('weather-info-img');
            break;
        case 'Patchy rain nearby':
            image.src = 'images/rain.png';
            image.classList.add('weather-info-img');
            break;
        default:
            image.src = 'images/clouds.png';
            image.classList.add('weather-info-img');
            break;
    }
    temperature.innerHTML = `${parseInt(response.current.temp_c)}°C`;
    description.innerHTML = `${response.current.condition.text}`;
    humidity.innerHTML = `${response.current.humidity}%`;
    wind.innerHTML = `${parseInt(response.current.wind_kph)}km/h`;
}