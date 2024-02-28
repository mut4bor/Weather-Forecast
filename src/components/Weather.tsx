import Date from '../components/Date';
import ClearDay from '../icons/Clear.png';
import ClearNight from '../icons/MostlyClearNight.png';
import PartlyCloudyDay from '../icons/PartlyCloudy.png';
import PartlyCloudyNight from '../icons/PartlyCloudyNight.png';
import Cloudy from '../icons/Cloudy.png';
import Snow from '../icons/Snow.png';
import Fog from '../icons/Fog.png';
import Thunderstorm from '../icons/Thunderstorm.png';
import Rain from '../icons/Drizzle.png';
import HeavyRain from '../icons/HeavyRain.png';
import BrokenClouds from '../icons/Cloudy.png';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { WeatherAPIResponse, isErrorResponse } from '../redux/weatherTypes';
import { fetchData } from '../redux/slices/weatherSlice';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import SVG from './SVG';
import _ from 'lodash';

type WeatherProps = {
  data: WeatherAPIResponse | undefined;
};

const Weather = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.weather.data);
  const coords = useAppSelector((state) => state.coords);

  const storedCoords = localStorage.getItem('coords');
  const parsedCoords = storedCoords ? JSON.parse(storedCoords) : null;

  const cachedLatitude = parsedCoords ? parsedCoords.latitude : null;
  const cachedLongitude = parsedCoords ? parsedCoords.longitude : null;

  const storedSettings = localStorage.getItem('settingsBoolean');
  const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;
  const cacheBoolean = useAppSelector((state) => state.settings.cacheBoolean);

  useEffect(() => {
    if (
      cachedLatitude &&
      cachedLongitude &&
      (parsedSettings === true || cacheBoolean === true)
    ) {
      dispatch(
        coordsChanged({
          latitude: cachedLatitude,
          longitude: cachedLongitude,
        })
      );
      return;
    }
    if (parsedSettings === false || cacheBoolean === false) {
      localStorage.removeItem('coords');
      return;
    }
  }, [cacheBoolean, cachedLatitude, cachedLongitude, dispatch, parsedSettings]);

  useEffect(() => {
    const dispatchData = () => {
      dispatch(
        fetchData({
          latitude: parseCoordinate(coords.latitude),
          longitude: parseCoordinate(coords.longitude),
        })
      );
    };

    const debouncedFetchData = _.debounce(dispatchData, 500);
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [coords, cacheBoolean, parsedSettings, dispatch]);

  return (
    <>
      {data && isErrorResponse(data) && (
        <>
          <div>Error {data.cod}</div>
          <div>{data.message}</div>
        </>
      )}
      <HeaderWeather data={data} />
      <BodyWeather data={data} />
      <FooterWeather data={data} />
    </>
  );
};

export function HeaderWeather({ data }: WeatherProps) {
  return (
    <>
      {data && !isErrorResponse(data) && (
        <div className="font-semibold text-white">
          {data.name !== '' &&
            data.name.charAt(0).toUpperCase() + data.name.slice(1) + ', '}
          <Date />
        </div>
      )}
    </>
  );
}

export function BodyWeather({ data }: WeatherProps) {
  const iconMap = {
    '01d': ClearDay,
    '01n': ClearNight,
    '02d': PartlyCloudyDay,
    '02n': PartlyCloudyNight,
    '03d': Cloudy,
    '03n': Cloudy,
    '04d': BrokenClouds,
    '04n': BrokenClouds,
    '09d': HeavyRain,
    '09n': HeavyRain,
    '10d': Rain,
    '10n': Rain,
    '11d': Thunderstorm,
    '11n': Thunderstorm,
    '13d': Snow,
    '13n': Snow,
    '50d': Fog,
    '50n': Fog,
  } as Record<string, string>;

  const titleHandler = () => {
    if (data && !isErrorResponse(data)) {
      const faviconLinkTagList = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"]'
      );
      faviconLinkTagList.forEach(function (element) {
        element.setAttribute('href', iconMap[data.weather[0].icon]);
      });

      const defaultTitle = 'Weather Forecast by mut4bor';

      data.name !== ''
        ? (document.title = `${data.name} – ${defaultTitle}`)
        : (document.title = defaultTitle);
    }
  };

  useEffect(titleHandler, [data]);

  return (
    <>
      {data && !isErrorResponse(data) && (
        <div className="flex min-[320px]:flex-col min-[425px]:flex-row text-white gap-y-2">
          <div className="h-[48px] text-[48px] leading-[48px] flex items-center font-semibold mr-5">
            <p>{Math.round(data.main.temp)}°</p>
            <img
              className="h-[55px]"
              src={iconMap[data.weather[0].icon]}
              alt="Weather icon"
            />
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
      {data && !isErrorResponse(data) && (
        <div className="flex flex-row gap-5 text-white">
          <FooterInfo
            href="#wind"
            dataElement={data.wind.speed}
            measure=" м/с"
          />
          <FooterInfo
            href="#humidity"
            dataElement={data.main.humidity}
            measure="%"
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
};

export function FooterInfo(props: FooterInfoProps) {
  return (
    <div className="flex flex-row">
      <SVG svgClassName="w-[24px] h-[24px] mr-1 opacity-60" href={props.href} />
      {props.dataElement}
      {props.measure}
    </div>
  );
}

export default Weather;
