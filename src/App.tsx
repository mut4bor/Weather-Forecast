import React, { useState, useCallback } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import Date from "./components/Date";
import { IWeather } from "./components/Types";
import GeoMap from "./components/GeoMap";

function App() {

  const [apiLat, setApiLat] = useState(NaN);
  const [apiLon, setApiLon] = useState(NaN);
  const [api, setApi] = useState([]);
  const [data, setData] = useState<IWeather | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(true);
	

  const apiCall = () => {
    const apiKey = `939131d869af9ff0b3f372d6777bf3bc`;

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
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      });
  };

	const updateMapData = useCallback(([lat, lon]: [number, number]) => {
		setApiLat(lat)
		setApiLon(lon)
		console.log('updateMapData')
	}, [])

  return (
    <div className=" p-6 flex flex-row flex-wrap ">
			<div className=" w-[50%] ">
				<Date />
				<Weather data={data} />
			</div>
			<div className="w-[50%] p-4 border bg-[#101d29]">
        <Form
          onLatChange={setApiLat}
          onLonChange={setApiLon}
          apiCall={apiCall}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
			<GeoMap updateMapData={updateMapData} />
    </div>
  );
}

export default App;
