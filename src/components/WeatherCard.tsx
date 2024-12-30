import React from 'react';
import { Cloud, Thermometer, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-red-500" />
          <div>
            <p className="text-3xl font-bold">{Math.round(data.main.temp)}°C</p>
            <p className="text-gray-500">Feels like {Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="text-blue-500" />
          <div>
            <p className="font-semibold">{data.weather[0].main}</p>
            <p className="text-gray-500 capitalize">{data.weather[0].description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="text-gray-500" />
          <div>
            <p className="font-semibold">{data.wind.speed} m/s</p>
            <p className="text-gray-500">Wind Speed</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="font-semibold">{data.main.humidity}%</p>
            <p className="text-gray-500">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};