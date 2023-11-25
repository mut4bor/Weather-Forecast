import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import Date from "./components/Date";
import { IWeather } from "./components/Types";
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import MapA from "./components/Map";

function App() {

  const [apiLat, setApiLat] = useState("");
  const [apiLon, setApiLon] = useState("");
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

  return (
    <div className=" p-6 flex flex-row flex-wrap ">
      {/* <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"></div> */}
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
			<MapA />
    </div>
  );
}

export default App;
