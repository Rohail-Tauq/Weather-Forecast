import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = "your-api"; // Replace with your actual key

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(res.data);
    } catch (err) {
      alert("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchForecast = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const daily = res.data.list.filter((item, index) => index % 8 === 0);
      setForecast(daily);
    } catch (err) {
      console.log("Forecast fetch error");
    }
  };

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    fetchWeather();
    fetchForecast();
  };

  return (
    <div className="app">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <ForecastCard data={forecast} />}
    </div>
  );
}

export default App;