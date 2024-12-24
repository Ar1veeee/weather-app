# Weather App

This is a simple weather app built using JavaScript, HTML, and CSS. It allows users to search for weather information by city name and displays the current weather, temperature, humidity, wind speed, and more. The app fetches data from the OpenWeatherMap API.

## Features

- Search weather by city name.
- Displays current temperature, feels like temperature, humidity, wind speed, and air pressure.
- Displays an icon representing the weather condition (e.g., sunny, cloudy, rainy).
- Shows wind direction based on the wind's degree.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Open index.html in your browser to run the app.

## Usage

1. Enter the name of the city in the input field.
2. Click the "Search" button to get the current weather information for that city.
3. The weather details, including temperature, humidity, wind speed, and pressure, will be displayed.

## API Key Setup

1.  Sign up at [OpenWeatherMap](https://openweathermap.org/appid) to get an API key.
2. Replace YOUR_API_KEY in the script (script.js) with your API key.
    ```bash
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    ```

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript
- OpenWeatherMap API

## Structure Folder

```bash
├── dist/
│   ├── img/             # Contains image assets (icons, backgrounds, etc.)
│   └── js/              # Contains JavaScript files
│       └── script.js    # Main JavaScript file handling the weather data fetch
├── src/
│   └── output.css      # Tailwind CSS compiled output
│   └── input.css      # Tailwind CSS compiled output
├── index.html          # Main HTML file
└── README.md           # This file
API key
```    

## Contributing

Feel free to fork the repository and submit pull requests. You can contribute by fixing bugs, adding new features, or improving the design.

## License
This project is open-source and available under the [MIT License](LICENSE).