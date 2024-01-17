import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherAPIResponse } from "./weatherTypes";

export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (coords: { latitude: number; longitude: number }) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const searchParams = new URLSearchParams({
      lat: coords.latitude.toString(),
      lon: coords.longitude.toString(),
      appid: apiKey || "NO_KEY_PROVIDED",
      units: "metric",
      lang: "ru",
    });

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

    const response = await fetch(`${apiUrl}?${searchParams.toString()}`);
    console.log("api call");
    const data = await response.json();
    return data;
  }
);

type IWeatherSlice = {
  data: WeatherAPIResponse | undefined;
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
