import {
  GET_OPTIONS,
  GET_OPTIONS_SUCCESS,
  GET_OPTIONS_FAIL,
} from "./actionTypes";

export const getOptions = (request) => {
  return {
    type: GET_OPTIONS,
    payload: request,
  };
};

export const getOptionsSuccess = (response) => {
  return {
    type: GET_OPTIONS_SUCCESS,
    payload: response,
  };
};

export const getOptionsFail = (error) => {
  return {
    type: GET_OPTIONS_FAIL,
    payload: error,
  };
};
