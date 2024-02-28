import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
const changeLog = (action: any) => {
  console.log(
    '%c reducer',
    'background: green; color: white; display: block;',
    action
  );
};

interface ICoordsSlice {
  latitude: string;
  longitude: string;
}

const coordsSlice = createSlice({
  name: 'coords',

  initialState: {
    latitude: '59.9533',
    longitude: '30.3068',
  } as ICoordsSlice,

  reducers: {
    coordsChanged(state, action) {
      changeLog(action);
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { coordsChanged } = coordsSlice.actions;
export default coordsSlice.reducer;

export const coordsMiddleware: Middleware = (store) => (next) => (action) => {
  const latitudeToSave = store.getState().coords.latitude as string;
  const longitudeToSave = store.getState().coords.longitude;
  const cacheBoolean = store.getState().settings.cacheBoolean;
  const storedSettings = localStorage.getItem('settingsBoolean');
  const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;

  if (parsedSettings === true || cacheBoolean === true) {
    localStorage.setItem(
      'coords',
      JSON.stringify({
        latitude: latitudeToSave === '' ? '0' : latitudeToSave,
        longitude: longitudeToSave === '' ? '0' : longitudeToSave,
      })
    );
  }

  return next(action);
};
