import { configureStore } from '@reduxjs/toolkit';
import coordsSlice, { coordsMiddleware } from './slices/coordsSlice';
import weatherSlice from './slices/weatherSlice';
import mapSlice from './slices/mapSlice';
import settingSlice from './slices/settingSlice';
export const store = configureStore({
  reducer: {
    coords: coordsSlice,
    weather: weatherSlice,
    map: mapSlice,
    settings: settingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coordsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
