function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <p>{data.weather[0].main} - {data.weather[0].description}</p>
      <p>🌡 Temp: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>💨 Wind: {data.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;