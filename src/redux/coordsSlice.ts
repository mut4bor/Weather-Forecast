import { createSlice } from "@reduxjs/toolkit";
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

export const { latitudeChanged, longitudeChanged } = coordsSlice.actions;
export default coordsSlice.reducer;
