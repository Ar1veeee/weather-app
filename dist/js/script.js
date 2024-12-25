const apiKey = "YOUR_API_URL"; // Ganti dengan API key OpenWeatherMap Anda
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// Fungsi untuk mendapatkan arah angin
function getWindDirection(degree) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degree % 360) / 45) % 8;
  return directions[index];
}

// Fungsi untuk mengonversi Unix timestamp + timezone offset ke waktu lokal
function convertToLocalTimeText(unixTime, timezoneOffset) {
  const localTime = new Date((unixTime + timezoneOffset) * 1000);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  return localTime.toLocaleDateString("en-US", options);
}

// Event listener untuk tombol pencarian
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        return response.json();
      })
      .then((data) => {
        // Destrukturisasi data
        const { name, main, weather, wind, dt, timezone } = data;
        const localTimeText = convertToLocalTimeText(dt, timezone); // Konversi waktu lokal
        const temperature = Math.round(main.temp);
        const feels_like = Math.round(main.feels_like);
        const humidity = main.humidity;
        const windSpeed = wind.speed;
        const windDeg = wind.deg;
        const pressure = main.pressure;
        const description = weather[0].main;

        // Tentukan ikon cuaca
        let iconSrc = "";
        switch (description) {
          case "Clear":
            iconSrc = "dist/img/sun.png";
            break;
          case "Clouds":
            iconSrc = "dist/img/cloudy.png";
            break;
          case "Rain":
            iconSrc = "dist/img/rain.png";
            break;
          case "Mist":
            iconSrc = "dist/img/mist.png";
            break;
          default:
            iconSrc = "dist/img/cloudy.png";
        }

        // Update tampilan cuaca
        weatherInfo.innerHTML = `
                    <div class="my-5 text-center font-semibold">
                        <h1>${localTimeText}</h1>
                    </div>
                    <div class="flex justify-center mb-10">
                        <div class="mr-10 font-sans">
                            <p class="text-3xl mt-10">${name}</p>
                            <h1 class="text-3xl">${temperature} °C</h1>
                            <p class="text-xl">${
                              description.charAt(0).toUpperCase() +
                              description.slice(1)
                            }</p>
                        </div>
                        <div>
                            <img src="${iconSrc}" alt="${description}" width="150px">
                        </div>
                    </div>
                    <div class="flex justify-center mt-5 p-2">
                        <div class="flex">
                            <img src="dist/img/temp.png" alt="Temp" width="45px">
                            <span class="font-semibold ml-2">
                                <p>${feels_like} °C</p>
                                <p>Feels Like</p>
                            </span>
                        </div>
                        <div class="flex ml-10">
                            <img src="dist/img/humidity.png" alt="Humidity" width="45px">
                            <span class="font-semibold ml-2">
                                <p>${humidity} %</p>
                                <p>Humidity</p>
                            </span>
                        </div>
                        <div class="flex ml-10">
                            <img src="dist/img/wind.png" alt="Wind" width="45px">
                            <span class="font-semibold ml-2">
                                <p>${windSpeed} m/s</p>
                                <p>Wind Speed</p>
                            </span>
                        </div>
                        <div class="flex ml-10">
                            <img src="dist/img/compass.png" alt="Wind Direction" width="45px">
                            <span class="font-semibold ml-2">
                                <p>${getWindDirection(windDeg)}</p>
                                <p>Wind Direction</p>
                            </span>
                        </div>
                        <div class="flex ml-10">
                            <img src="dist/img/pressure.png" alt="Pressure" width="45px">
                            <span class="font-semibold ml-2">
                                <p>${pressure} hPa</p>
                                <p>Pressure</p>
                            </span>
                        </div>
                    </div>
                `;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML =
          "<p>City not found or API error. Please check your input and try again.</p>";
      });
  } else {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
  }
});
