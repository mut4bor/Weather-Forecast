import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    latitude: 59.9533,
    longitude: 30.3068,
  },
  reducers: {
    latitude(state, action) {
      console.log(
        "%c reducer",
        "background: green; color: white; display: block;",
        action
      );
			state.latitude = action.payload
    },
    longitude(state, action) {
      console.log(
        "%c reducer",
        "background: green; color: white; display: block;",
        action
      );
			state.longitude = action.payload
    },
  },
});

export const { latitude, longitude } = coordsSlice.actions;
export default coordsSlice.reducer;
