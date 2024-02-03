import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
	name: 'settings',

	initialState: {
		settingsBoolean: false,
		cacheBoolean: true,
		modalPosition: {
			vertical: 'top',
			horizontal: 'right',
		},
	},

	reducers: {
		settingsToggled(state, action) {
			state.settingsBoolean = action.payload;
		},
		cacheBooleanToggled(state, action) {
			state.cacheBoolean = action.payload;
		},
		modalPositionChanged(state, action) {
			state.modalPosition = action.payload;
		},
	},
});

export const {
	settingsToggled,
	cacheBooleanToggled,
	modalPositionChanged,
} = settingSlice.actions;
export default settingSlice.reducer;
