import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
const changeLog = (action: any) => {
	console.log(
		'%c reducer',
		'background: green; color: white; display: block;',
		action
	);
};

const coordsSlice = createSlice({
	name: 'coords',

	initialState: {
		latitude: '59.9533',
		longitude: '30.3068',
	},

	reducers: {
		latitudeChanged(state, action: PayloadAction<string>) {
			changeLog(action);
			state.latitude = action.payload;
		},
		longitudeChanged(state, action: PayloadAction<string>) {
			changeLog(action);
			state.longitude = action.payload;
		},
	},
});

export const { latitudeChanged, longitudeChanged } = coordsSlice.actions;
export default coordsSlice.reducer;

export const coordsMiddleware: Middleware = (store) => (next) => (action) => {
	const storedSettings = localStorage.getItem('settings');
	const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;

	const cacheBoolean = store.getState().settings.cacheBoolean;

	if (parsedSettings === true || cacheBoolean === true) {
		const stateToSave = store.getState().coords;
		localStorage.setItem('weather', JSON.stringify(stateToSave));
	}

	return next(action);
};
