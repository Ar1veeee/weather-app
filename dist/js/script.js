const apiKey = "dabbf6578441104f5e6678728853e0c9"; // Ganti dengan API key OpenWeatherMap Anda
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const citySuggestions = document.getElementById("citySuggestions");

// Fungsi untuk mendapatkan saran kota dari OpenWeatherMap
async function getCitySuggestions(query) {
  if (query.length < 1) {
    citySuggestions.innerHTML = ""; 
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );

  if (!response.ok) {
    console.error("Error fetching city suggestions");
    return;
  }

  const cities = await response.json();
  showCitySuggestions(cities);
}

// Fungsi untuk menampilkan daftar saran kota
function showCitySuggestions(cities) {
  citySuggestions.innerHTML = ""; 

  if (cities.length === 0) {
    return; 
  }

  citySuggestions.innerHTML = `
    <ul class="absolute bg-gradient-mobile rounded cursor-pointer">
      ${cities
        .map(
          (city) => `
        <li class="p-2 hover:bg-blue-700 cursor-pointer" onclick="selectCity('${city.name}')">
          ${city.name}, ${city.country}
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

// Fungsi untuk memilih kota dari daftar saran
function selectCity(cityName) {
  cityInput.value = cityName; 
  citySuggestions.innerHTML = ""; 
}

// Event listener saat mengetik di input
cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();
  getCitySuggestions(query);
});

// Event listener untuk menyembunyikan saran saat klik di luar
document.addEventListener("click", (event) => {
  if (!cityInput.contains(event.target) && !citySuggestions.contains(event.target)) {
    citySuggestions.innerHTML = "";
  }
});

// Fungsi untuk mendapatkan arah angin
function getWindDirection(degree) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degree % 360) / 45) % 8;
  return directions[index];
}

function preloadVideo(src) {
  const video = document.createElement("video");
  video.src = src;
  video.preload = "auto"; // Preload resource
}

const weatherVideos = {
  rain: "dist/video/rain.mp4",
  sun: "dist/video/sun.mp4",
  snow: "dist/video/snow.mp4",
  cloudy: "dist/video/cloudy.mp4",
};

Object.values(weatherVideos).forEach(preloadVideo);

const weatherVideo = document.getElementById("weatherVideo");

// Fungsi untuk memperbarui video berdasarkan cuaca
function updateWeatherVideo(description) {
  const videoElement = document.getElementById("weatherVideo");
  const sourceElement = videoElement.querySelector("source");

  let videoSrc = "dist/video/default.mp4";

  switch (description) {
    case "Clear":
      videoSrc = "dist/video/sun.webm";
      break;
    case "Clouds":
      videoSrc = "dist/video/cloudy.webm";
      break;
    case "Rain":
      videoSrc = "dist/video/rain.webm";
      break;
    case "Snow":
      videoSrc = "dist/video/snow.webm";
      break;
    case "Mist":
    case "Haze":
    case "Fog":
      videoSrc = "dist/video/mist.webm";
      break;
  }

  // Transisi video
  videoElement.classList.add("fade-out");

  setTimeout(() => {
    sourceElement.src = videoSrc;
    videoElement.load();
    videoElement.classList.remove("fade-out");
    videoElement.classList.add("fade-in");

    setTimeout(() => {
      videoElement.classList.remove("fade-in");
    }, 300);
  }, 300);
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
        const description = weather[0].main;

        updateWeatherVideo(description);

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
               <div class="my-5 text-center font-sans text-slate-200">
                   <h1>${localTimeText}</h1>
               </div>
               <div class="flex justify-center items-center mb-10 gap-8">
                   <div class="mr-10 font-sans">
                       <p class="xl:text-3xl md:text-2xl text-xl">${name}</p>
                       <h1 class="xl:text-3xl md:text-2xl text-xl">${temperature} °C</h1>
                       <p class="xl:text-3xl md:text-2xl text-xl">${
                         description.charAt(0).toUpperCase() +
                         description.slice(1)
                       }</p>
                   </div>
                   <div>
                       <img src="${iconSrc}" alt="${description}" width="150px">
                   </div>
               </div>
               <div class="flex justify-between flex-wrap mt-5 p-2">
                  <div class="flex gap-2">
                      <div>
                          <img src="dist/img/temp.png" alt="Temp" width="30px" height="30px">
                      </div>
                      <div class="">
                          <span class="text-slate-300">Feels Like</span>
                      <p class="text-2xl">${feels_like} °C</p>
                      </div>
                  </div>                   
                  <div class="flex gap-2">
                      <div>
                          <img src="dist/img/humidity.png" alt="Temp" width="30px" height="30px">
                      </div>
                      <div class="">
                          <span class="text-slate-300">Humidity</span>
                      <p class="text-2xl">${humidity} %</p>
                      </div>
                  </div>                   
                  <div class="flex gap-2">
                      <div>
                          <img src="dist/img/wind.png" alt="Temp" width="30px" height="30px">
                      </div>
                      <div class="">
                          <span class="text-slate-300">Wind</span>
                      <p class="text-2xl">${windSpeed} m/s</p>
                      </div>
                  </div>                   
                  <div class="flex gap-2">
                      <div>
                          <img src="dist/img/compass.png" alt="Temp" width="30px" height="30px">
                      </div>
                      <div class="">
                          <span class="text-slate-300">Direction</span>
                      <p class="text-2xl">${getWindDirection(
                             windDeg
                           )}</p>
                      </div>
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
