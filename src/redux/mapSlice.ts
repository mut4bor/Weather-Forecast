import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",

  initialState: {
    latitude: 59.9533,
    longitude: 30.3068,
  },

  reducers: {
    mapLatitudeChanged(state, action) {
      state.latitude = action.payload;
    },
    mapLongitudeChanged(state, action) {
      state.longitude = action.payload;
    },
  },
});

export const { mapLatitudeChanged, mapLongitudeChanged } = mapSlice.actions;
export default mapSlice.reducer;
