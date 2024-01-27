import { all, fork } from "redux-saga/effects";

import PostSaga from "./posts/saga";
import OptionSaga from "./options/saga";

export default function* rootSaga() {
  yield all([
    fork(PostSaga),
    fork(OptionSaga)
  ]);
}