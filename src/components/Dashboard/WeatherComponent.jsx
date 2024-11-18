import React, { useState, useEffect } from "react";
import './Dashboard.css';


const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "380789c61f2f2e9627843953020d108f";

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setLoading(false);
      } else {
        setError(data.message || "Unable to fetch weather data");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("Failed to get user location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="weather__overlay">
      {loading && <p className="weather__error">Loading weather data...</p>}
      {error && <p className="weather__error">{error}</p>}
      {weatherData && (
        <div className="weather__overlay">
          <p className="weather__location">{weatherData.name}</p>
          <div className="weather__details">
            <img className="weather__icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            <p className="weather__temp">{Math.round(weatherData.main.temp)}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
