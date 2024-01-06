import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",

  initialState: {
    latitude: 59.9533,
    longitude: 30.3068,
  },

  reducers: {
    inputLatitudeChanged(state, action) {
      state.latitude = action.payload;
    },
    inputLongitudeChanged(state, action) {
      state.longitude = action.payload;
    },
  },
});

export const { inputLatitudeChanged, inputLongitudeChanged } = mapSlice.actions;
export default mapSlice.reducer;
