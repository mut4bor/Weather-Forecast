import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
	name: 'settings',

	initialState: {
		settingsBoolean: false,
		cacheBoolean: true,
		modalValues: {
			modalFirstValue: 'top-[10px]',
			modalSecondValue: 'right-[10px]',
		},
	},

	reducers: {
		settingsToggled(state, action) {
			state.settingsBoolean = action.payload;
		},
		cacheBooleanToggled(state, action) {
			state.cacheBoolean = action.payload;
		},
		modalValuesChanged(state, action) {
			state.modalValues = action.payload;
		},
	},
});

export const {
	settingsToggled,
	cacheBooleanToggled,
	modalValuesChanged,
} = settingSlice.actions;
export default settingSlice.reducer;
