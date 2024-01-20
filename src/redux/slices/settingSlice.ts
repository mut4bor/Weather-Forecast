import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
	name: 'settings',

	initialState: {
		settingsBoolean: false,
		cacheBoolean: true,
	},

	reducers: {
		settingsToggle(state, action) {
			state.settingsBoolean = action.payload;
		},
		cacheBooleanToggle(state, action) {
			state.cacheBoolean = action.payload;
		},
	},
});

export const { settingsToggle, cacheBooleanToggle } = settingSlice.actions;
export default settingSlice.reducer;