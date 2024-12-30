import axios from "axios";

const API_KEY = process.env.API_KEY; // Replace with your OpenWeather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  getCurrentWeather: async (city) => {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  },

  getHourlyForecast: async (city) => {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  },

  getCurrentLocationWeather: async (lat, lon) => {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    console.log(response.data);
    return response.data;
  },

  getCurrentLocationHourlyForecast: async (lat, lon) => {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  },
};
