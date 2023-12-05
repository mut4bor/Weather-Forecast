
const initialState = {
  inputLatitude: 59.95338836499352,
  inputLongitude: 30.306886328124797,
  circleLatitude: 59.95338836499352,
  circleLongitude: 30.306886328124797,
};

export default function CoordsReducer(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'coords/InputLatReducer': {
			return {
				...state,
				inputLatitude: action.payload,
				circleLatitude: action.payload,
			}
    }
    case 'coords/InputLonReducer': {
			return {
				...state,
				inputLongitude: action.payload,
				circleLongitude: action.payload,
			}
    }
    case 'coords/CircleLatReducer': {
			return {
				...state,
				circleLatitude: action.payload,
				inputLatitude: action.payload,
			}
    }
    case 'coords/CircleLonReducer': {
			return {
				...state,
				circleLongitude: action.payload,
				inputLongitude: action.payload,
			}
    }
    default:
      return state
  }
}


