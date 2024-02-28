import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',

  initialState: {
    centerBoolean: true,
    zoom: 9,
    circleSize: 3000,
  },

  reducers: {
    centerBooleanToggle(state, action) {
      state.centerBoolean = action.payload;
    },
    zoomChanged(state, action) {
      state.zoom = action.payload;
      console.log(action.payload);
    },
    circleSizeChanged(state, action) {
      state.circleSize = action.payload;
    },
  },
});

export const { centerBooleanToggle, zoomChanged, circleSizeChanged } =
  mapSlice.actions;
export default mapSlice.reducer;
