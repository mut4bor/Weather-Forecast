import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
	name: 'map',

	initialState: {
		centerBoolean: true,
		zoom: 9,
	},

	reducers: {
		shouldCenter(state) {
			state.centerBoolean = true;
		},
		shouldNotCenter(state) {
			state.centerBoolean = false;
		},
		zoomChanged(state, action) {
			state.zoom = action.payload;
		},
	},
});

export const { shouldCenter, shouldNotCenter, zoomChanged } = mapSlice.actions;
export default mapSlice.reducer;
