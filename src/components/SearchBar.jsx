import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useCitySearch } from "../hooks/useCitySearch";

export function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const { suggestions, searchCities } = useCitySearch();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (query.length >= 2) {
      searchCities(query);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && query.length >= 2 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(city);
                    onSearch(city);
                    setQuery("");
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
          onClick={() => searchCities("")}
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
