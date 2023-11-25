import React, { useState, useEffect } from "react";
import { IWeather } from "./Types";
import ClearDay from "../icons/Clear.png";
import ClearNight from "../icons/MostlyClearNight.png";
import PartlyCloudyDay from "../icons/PartlyCloudy.png";
import PartlyCloudyNight from "../icons/PartlyCloudyNight.png";
import Cloudy from "../icons/Cloudy.png";
import Snow from "../icons/Snow.png";
import Fog from "../icons/Fog.png";
import Thunderstorm from "../icons/Thunderstorm.png";
import Rain from "../icons/Drizzle.png";
import HeavyRain from "../icons/HeavyRain.png";
import BrokenClouds from "../icons/Cloudy.png";
import { FullscreenControl } from "@pbe/react-yandex-maps";


type WeatherProps = {
	data: IWeather | undefined;
}

const Weather = ({data}: WeatherProps) => {

	const [weatherIcon, setWeatherIcon] = useState("")

	const weatherIconHandler = (condition:string, iconID:string) => {
		if (data) {
			if (data.weather[0].icon == condition) {
				setWeatherIcon(iconID)
			}
		}
	}

	useEffect(() => {
		weatherIconHandler('01d', ClearDay);
		weatherIconHandler('01n', ClearNight);
		weatherIconHandler('02d', PartlyCloudyDay);
		weatherIconHandler('02n', PartlyCloudyNight);
		weatherIconHandler('03d', Cloudy);
		weatherIconHandler('03n', Cloudy);
		weatherIconHandler('04d', BrokenClouds);
		weatherIconHandler('04n', BrokenClouds);
		weatherIconHandler('09d', HeavyRain);
		weatherIconHandler('09n', HeavyRain);
		weatherIconHandler('10d', Rain);
		weatherIconHandler('10n', Rain);
		weatherIconHandler('11d', Thunderstorm);
		weatherIconHandler('11n', Thunderstorm);
		weatherIconHandler('13d', Snow);
		weatherIconHandler('13n', Snow);
		weatherIconHandler('50d', Fog);
		weatherIconHandler('50n', Fog);
	})

	//! const hqf = [['01d', ClearDay], ['02', arstarst]]

	return (
	<>
    {data && (
        <div className=" text-white ">
          <div>{data.name}</div>
					<div>
						<div>Температура: {data.main.temp}°</div>
						<div><img src={weatherIcon} /></div>
						<div>Ощущается как: {data.main.feels_like}°</div>
						{/* <div>{data.weather[0].icon}</div> */}
					</div>
					<div>Скорость ветра: {data.wind.speed} м/с</div>
        </div>
      
    )}
  </>
	)
}
export default Weather;
