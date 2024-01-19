import { configureStore } from '@reduxjs/toolkit';
import coordsSlice, { middleware } from './slices/coordsSlice';
import weatherSlice from './slices/weatherSlice';
import mapSlice from './slices/mapSlice';
export const store = configureStore({
	reducer: {
		coords: coordsSlice,
		weather: weatherSlice,
		map: mapSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
