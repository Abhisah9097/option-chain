import {
  GET_OPTIONS,
  GET_OPTIONS_SUCCESS,
  GET_OPTIONS_FAIL,
} from "./actionTypes";

const initialState = {
  options: {
    expiryDates: null, 
    underlyingValue: null, 
    strikePrices: null, 
    timestamp: null, 
    filtered: null
  },
  error: null,
  loading: null
};

const OptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPTIONS:
      return {
        ...state,
        loading: true
      }
    case GET_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: action.payload,
      }
    case GET_OPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        options: action.payload,
      }
    default:
      return state
  }
};

export default OptionReducer;