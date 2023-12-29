import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IWeather } from "../components/WeatherTypes";
import { useAppSelector } from "./hooks";

export const fetchData = createAsyncThunk("weather/fetchData", async () => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const latitude = useAppSelector((state) => state.coords.latitude);
  const longitude = useAppSelector((state) => state.coords.longitude);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather
                  ?lat=${latitude}
                  &lon=${longitude}
                  &appid=${apiKey}
                  &units=metric
                  &lang=ru`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
});

interface IWeatherSlice {
  data: IWeather;
	loading: "idle" | "pending" | "succeeded" | "failed";
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
		loading: 'idle'
  } as IWeatherSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state = action.payload;
    });
  },
});


export default weatherSlice.reducer;
