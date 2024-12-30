import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ForecastData } from '../types/weather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastChartProps {
  data: ForecastData;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = {
    labels: data.list.slice(0, 8).map(item => 
      new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.list.slice(0, 8).map(item => item.main.temp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '24-Hour Temperature Forecast',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Line options={options} data={chartData} />
    </div>
  );
};