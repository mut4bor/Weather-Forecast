import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
	name: 'map',

	initialState: {
		centerBoolean: true,
		zoom: 4,
	},

	reducers: {
		centerBooleanToggle(state, action) {
			state.centerBoolean = action.payload;
		},
		zoomChanged(state, action) {
			state.zoom = action.payload;
		},
	},
});

export const { centerBooleanToggle, zoomChanged } = mapSlice.actions;
export default mapSlice.reducer;
