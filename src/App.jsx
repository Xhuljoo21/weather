import React, { useState, useEffect } from "react";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastChart } from "./components/ForecastChart";
import { SearchBar } from "./components/SearchBar";
import { weatherApi } from "./services/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async (city) => {
    try {
      setLoading(true);
      setError("");

      const weather = await weatherApi.getCurrentWeather(city);
      const forecast = await weatherApi.getHourlyForecast(city);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [currentLocation, setCurrentLocation] = useState(null);

  const getCurrentLocationWeather = async () => {
    try {
      const [currentWeather, hourlyForecast] = await Promise.all([
        weatherApi.getCurrentLocationWeather(
          currentLocation.latitude,
          currentLocation.longitude
        ),
        weatherApi.getCurrentLocationHourlyForecast(
          currentLocation.latitude,
          currentLocation.longitude
        ),
      ]);
      setWeatherData(currentWeather);
      setForecastData(hourlyForecast);
    } catch (error) {
      console.error("Error fetching current location weather:", error);
    }
  };

  useEffect(() => {
    currentLocation && getCurrentLocationWeather();
  }, [currentLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={fetchWeatherData} loading={loading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {weatherData && <WeatherCard data={weatherData} />}
            {forecastData && <ForecastChart data={forecastData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
