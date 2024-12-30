import { useState } from "react";
import axios from "axios";

export function useCitySearch() {
  const [suggestions, setSuggestions] = useState([]);

  const searchCities = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const API_KEY = process.env.API_KEY; // Use your OpenWeather API key
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      const cities = response.data.map(
        (item) =>
          `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`
      );

      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]);
    }
  };

  return { suggestions, searchCities };
}
