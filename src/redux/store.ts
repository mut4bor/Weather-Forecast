import { configureStore } from "@reduxjs/toolkit";
import coordsSlice from "./coordsSlice";
import weatherSlice from "./weatherSlice";
import mapSlice from "./mapSlice";
export const store = configureStore({
  reducer: {
    coords: coordsSlice,
    weather: weatherSlice,
    map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
