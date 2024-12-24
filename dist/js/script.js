const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const { name, main, weather, wind } = data;
                const temperature = Math.round(main.temp);
                const feels_like = Math.round(main.feels_like);
                const humidity = main.humidity;
                const windSpeed = wind.speed;
                const windDeg = wind.deg;
                const pressure = main.pressure;
                const description = weather[0].description;

                let iconSrc = '';
                switch (description) {
                    case 'clear sky':
                        iconSrc = 'dist/img/sun.png';
                        break;
                    case 'few clouds':
                    case 'scattered clouds':
                    case 'broken clouds':
                    case 'overcast clouds':
                        iconSrc = 'dist/img/cloudy.png';
                        break;
                    case 'light rain':
                    case 'moderate rain':
                        iconSrc = 'dist/img/rain.png';
                        break;
                    default:
                        iconSrc = 'dist/img/cloudy.png';
                }

                weatherInfo.innerHTML = `
                    <div class="flex justify-center my-10">
                        <div class="mr-10 font-sans">
                            <p class="text-3xl mt-10">${name}</p>
                            <h1 class="text-3xl">${temperature} °C</h1>
                            <p class="text-xl">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                        </div>
                        <div>
                            <img src="${iconSrc}" alt="${description}" width="150px">
                        </div>
                    </div>
                    <div class="flex justify-center mt-5 p-2">
                        <div class="flex">
                            <img src="dist/img/temp.png" alt="Temp" width="50px">
                            <span class="font-semibold ml-2">
                                <p>${feels_like} °C</p>
                                <p>Feels Like</p>
                            </span>
                        </div>
                        <div class="flex ml-20">
                            <img src="dist/img/humidity.png" alt="Humidity" width="50px">
                            <span class="font-semibold ml-2">
                                <p>${humidity} %</p>
                                <p>Humidity</p>
                            </span>
                        </div>
                        
                        <div class="flex ml-20">
                            <img src="dist/img/wind.png" alt="Wind" width="50px">
                            <span class="font-semibold ml-2">
                                <p>${windSpeed} m/s</p>
                                <p>Wind Speed</p>
                            </span>
                        </div>
                        <div class="flex ml-20">
                            <img src="dist/img/compass.png" alt="Wind Direction" width="50px">
                            <span class="font-semibold ml-2">
                                <p>${getWindDirection(windDeg)}</p>
                                <p>Wind Direction</p>
                            </span>
                        </div>
                        <div class="flex ml-20">
                            <img src="dist/img/pressure.png" alt="Pressure" width="50px">
                            <span class="font-semibold ml-2">
                                <p>${pressure} hPa</p>
                                <p>Pressure</p>
                            </span>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>City not found or API error. Please check your input and try again.</p>';
            });
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});
