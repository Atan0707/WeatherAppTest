import { useState } from "react";
import speed from './speed.jpg';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid={url}`;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(e.target.elements[0].value);
    fetchData();
  };

  const convertToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Weather app</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {data && data.main ? <h1>Temperature: {convertToCelsius(data.main.temp)}°C</h1> : null}
      {data && data.weather ? <h1>Weather: {data.weather[0].description}</h1> : null}
      {data && data.main ? <h1>Humidity: {data.main.humidity}%</h1> : null}
      {data && data.main ? <h1>Min Temp: {convertToCelsius(data.main.temp_min)}°C</h1> : null}
      {data && data.main ? <h1>Max Temp: {convertToCelsius(data.main.temp_max)}°C</h1> : null}

      <img src={speed} alt="speed"></img>
    </div>
  );
}

export default App;
