import { Middleware } from "redux";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const stateToSave = store.getState().coordsSlice

  localStorage.setItem("weatherApp", JSON.stringify(stateToSave));

  return result;
};

export default localStorageMiddleware;
