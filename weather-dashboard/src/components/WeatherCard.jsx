// src/components/WeatherCard.jsx
import React from "react";

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;

  return (
    <div className="bg-white shadow-none rounded-none p-4 text-center">
      <h2 className="text-xl font-semibold">{weatherData.name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl">{weather[0].description}</p>
      <p className="text-2xl font-bold">{main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;
