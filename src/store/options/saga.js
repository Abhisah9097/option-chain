import { takeLatest, put, call } from "redux-saga/effects";

import { GET_OPTIONS } from "./actionTypes";

import { getOptionsFail, getOptionsSuccess } from "./actions";

import { getOptions } from "../../helpers/backend_helper";

function* onGetOptions() {
  try {
    const response = yield call(getOptions);
    yield put(getOptionsSuccess(response));
  } catch (error) {
    yield put(getOptionsFail(error.response));
  }
}

function* OptionSaga() {
  yield takeLatest(GET_OPTIONS, onGetOptions);
}

export default OptionSaga;
