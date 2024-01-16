export interface IWeather {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface IWeatherError {
  cod: number;
  message: string;
}

// Export type for successfull and failure API responses
export type WeatherAPIResponse = IWeather | IWeatherError;

// Type guards. More info here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
// Only one type guard for errors, let's thinks that all requests are successfull by default
export function isErrorResponse(data: WeatherAPIResponse): data is IWeatherError {
  return (data as IWeatherError).cod !== undefined;
}