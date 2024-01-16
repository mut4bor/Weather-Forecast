import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",

  initialState: {
    center: false
  },

  reducers: {
    shouldCenter(state) {
      state.center = true;
    },
    shouldNotCenter(state) {
      state.center = false;
    },
  },
});

export const { shouldCenter, shouldNotCenter } = mapSlice.actions;
export default mapSlice.reducer;
