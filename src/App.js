import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null); // Reset error message

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=974eff8be66d3884241d402824a0767e`
      );
      setWeatherData(response.data);
    } catch (error) {
      setWeatherData(null);
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data whenever the city changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  // Handle city input change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={fetchWeatherData} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} km/h</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;