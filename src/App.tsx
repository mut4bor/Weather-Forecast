import { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import { IWeather } from "./components/WeatherTypes";
import GeoMap from "./components/GeoMap";

function App() {
  const [apiLat, setApiLat] = useState(59.901);
  const [apiLon, setApiLon] = useState(30.2959);
  const [data, setData] = useState<IWeather | undefined>();

  return (
    <>
      <div className=" p-6 flex flex-col flex-wrap absolute z-50 bg-[#101d29] rounded-lg right-[10px] top-[10px]">
        <Weather data={data} />
        <Form
          onLatChange={setApiLat}
          onLonChange={setApiLon}
        />
      </div>
      <GeoMap />
    </>
  );
}

export default App;
