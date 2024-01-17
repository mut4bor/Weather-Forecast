import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Date from "../components/Date";
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
import { IWeather } from "../redux/weatherTypes";
import { fetchData } from "../redux/slices/weatherSlice";
import _ from "lodash";
import { RootState } from '../redux/store';

type WeatherProps = {
  data: IWeather | undefined;
};

const Weather = () => {
  const data = useAppSelector((state) => state.weather.data);
  const coords = useAppSelector((state) => state.coords);
  const dispatch = useAppDispatch();

  const dispatchData = () => {
    dispatch(
      fetchData({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    );
  };

  useEffect(() => {
    const debouncedFetchData = _.debounce(dispatchData, 500);
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [coords]);

  return (
    <>
      <div className=" text-white ">
        <HeaderWeather data={data} />
        <BodyWeather data={data} />
        <FooterWeather data={data} />
      </div>
    </>
  );
};

export function HeaderWeather({ data }: WeatherProps) {
  if (data && data.name == "") {
    return (
      <div>
        <div className=" font-semibold ">
          <Date />
        </div>
      </div>
    );
  }
  return (
    <>
      {data && (
        <div className=" font-semibold ">
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}, <Date />
        </div>
      )}
    </>
  );
}

export function BodyWeather({ data }: WeatherProps) {
  const iconMap = {
    "01d": ClearDay,
    "01n": ClearNight,
    "02d": PartlyCloudyDay,
    "02n": PartlyCloudyNight,
    "03d": Cloudy,
    "03n": Cloudy,
    "04d": BrokenClouds,
    "04n": BrokenClouds,
    "09d": HeavyRain,
    "09n": HeavyRain,
    "10d": Rain,
    "10n": Rain,
    "11d": Thunderstorm,
    "11n": Thunderstorm,
    "13d": Snow,
    "13n": Snow,
    "50d": Fog,
    "50n": Fog,
  } as Record<string, string>;

  const weatherIconHandler = () => {
    if (data) {
      const faviconLinkTagList = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"]'
      );
      faviconLinkTagList.forEach(function (element) {
        element.setAttribute("href", iconMap[data.weather[0].icon]);
      });
      if (data.name == "") {
        document.title = `Weather Forecast by mut4bor`;
        return;
      }
      document.title = `${data.name} – Weather Forecast by mut4bor`;
    }
  };

  useEffect(weatherIconHandler, [data]);
  return (
    <>
      {data && (
        <div className="flex flex-row">
          <div className=" h-[48px] text-[48px] leading-[48px] flex items-center font-semibold">
            {Math.round(data.main.temp)}°
          </div>
          <div className="w-[80px] h-[57px] object-cover">
            <img className="h-[100%]" src={iconMap[data.weather[0].icon]} />
          </div>
          <div className="flex flex-col">
            <span>
              {data.weather[0].description.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1)}
            </span>
            <span>Ощущается как {Math.round(data.main.feels_like)}°</span>
          </div>
        </div>
      )}
    </>
  );
}
export function FooterWeather({ data }: WeatherProps) {
  return (
    <>
      {data && (
        <div className="flex flex-row gap-5">
          <FooterInfo
            href={"#wind"}
            dataElement={data.wind.speed}
            spaceSymbol={true}
            measure={`м/с`}
          />
          <FooterInfo
            href={"#humidity"}
            dataElement={data.main.humidity}
            spaceSymbol={false}
            measure={"%"}
          />
        </div>
      )}
    </>
  );
}

type FooterInfoProps = {
  href: string;
  dataElement: number;
  measure: string;
  spaceSymbol: boolean;
};

export function FooterInfo(props: FooterInfoProps) {
  return (
    <div className="flex flex-row">
      <svg className="w-[24px] h-[24px] mr-1 opacity-60">
        <use href={props.href} />
      </svg>
      {props.dataElement}
      {props.spaceSymbol == true ? " " : ""}
      {props.measure}
    </div>
  );
}

export default Weather;
