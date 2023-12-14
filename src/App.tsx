import React, { useState, useCallback } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import { IWeather } from "./components/WeatherTypes";
import GeoMap from "./components/GeoMap";

function App() {
  const [apiLat, setApiLat] = useState(59.901);
  const [apiLon, setApiLon] = useState(30.2959);
  const [data, setData] = useState<IWeather | undefined>();

  const apiCall = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather
		?lat=` +
      apiLat +
      `
		&lon=` +
      apiLon +
      `
		&appid=` +
      apiKey +
      `
		&units=metric&lang=ru`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      });
  };

  const updateMapData = useCallback(([lat, lon]: [number, number]) => {
    console.log(
      "%c update map data",
      "background: red; color: white; display: block;"
    );
    setApiLat(lat);
    setApiLon(lon);
    console.log(lat, lon);
  }, []);

  return (
    <>
      <div className=" p-6 flex flex-col flex-wrap absolute z-50 bg-[#101d29] rounded-lg right-[10px] top-[10px]">
        <Weather data={data} />
        <Form
          onLatChange={setApiLat}
          onLonChange={setApiLon}
          apiCall={apiCall}
          updateMapData={updateMapData}
        />
      </div>
      <GeoMap updateMapData={updateMapData} />
    </>
  );
}

export default App;
