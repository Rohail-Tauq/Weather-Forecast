import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = import.meta.env.VITE_PRIVATE_KEY;

  const sanitizeCity = (input) => {
    return input
      .trim()
      .replace(/\s+/g, " ");
  };

  const fetchWeather = async (sanitizedCity) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${sanitizedCity}&units=metric&appid=${apiKey}`
      );
      setWeather(res.data);
    } catch (err) {
      alert("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchForecast = async (sanitizedCity) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${sanitizedCity}&units=metric&appid=${apiKey}`
      );
      const daily = res.data.list.filter((item, index) => index % 8 === 0);
      setForecast(daily);
    } catch (err) {
      console.log("Forecast fetch error");
    }
  };

  const handleSearch = () => {
    const sanitizedCity = sanitizeCity(city);
    if (sanitizedCity === "") {
      alert("Please enter a city name");
      return;
    }

    fetchWeather(sanitizedCity);
    fetchForecast(sanitizedCity);
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
