function ForecastCard({ data }) {
  return (
    <div className="forecast-box">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {data.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{item.dt_txt.split(" ")[0]}</p>
            <p>{item.weather[0].main}</p>
            <p>{item.main.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
