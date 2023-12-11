import { LAT, LON } from "./actions";

const initialState = {
  latitude: 59.95338836499352,
  longitude: 30.306886328124797,
};

export default function CoordsReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  console.log(
    "%c reducer",
    "background: green; color: white; display: block;",
    action
  );
  switch (action.type) {
    case LAT: {
      return {
        ...state,
        latitude: action.payload,
      };
    }
    case LON: {
      return {
        ...state,
        longitude: action.payload,
      };
    }
    default:
      return state;
  }
}
