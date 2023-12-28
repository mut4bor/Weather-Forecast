import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const changeLog = (action: any) => {
  console.log(
    "%c reducer",
    "background: green; color: white; display: block;",
    action
  );
};

const coordsSlice = createSlice({
  name: "coords",

  initialState: {
    latitude: 59.9533,
    longitude: 30.3068,
  },

  reducers: {
    latitudeChanged(state, action) {
      changeLog(action);
      state.latitude = action.payload;
    },
    longitudeChanged(state, action) {
      changeLog(action);
      state.longitude = action.payload;
    },
  },
});

export const fetchData = createAsyncThunk('weather', async () => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const latitude = store.getState().coords.latitude;
  const longitude = store.getState().coords.longitude;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather
									?lat=${latitude}
									&lon=${longitude}
									&appid=${apiKey}
									&units=metric&lang=ru`;

  const response = await fetch(apiUrl);
  const data = await response.json();
	console.log(data)
  return data;
})

export const { latitudeChanged, longitudeChanged } = coordsSlice.actions;
export default coordsSlice.reducer;
