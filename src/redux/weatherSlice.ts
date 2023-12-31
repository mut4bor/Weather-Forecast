import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IWeather } from "./weatherTypes";

export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (coords: { latitude: number; longitude: number }) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather
										?lat=${coords.latitude}
										&lon=${coords.longitude}
										&appid=${apiKey}
										&units=metric
										&lang=ru`;
    const parsedApiUrl = apiUrl.replace(/\s+/g, "");

    const response = await fetch(parsedApiUrl);
    console.log("api call");
    const data = await response.json();
    return data;
  }
);

type IWeatherSlice = {
  data: IWeather | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    loading: "idle",
  } as IWeatherSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
    });
  },
});

export default weatherSlice.reducer;
