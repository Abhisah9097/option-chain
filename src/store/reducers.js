import { combineReducers } from "redux";

import PostReducer from "./posts/reducer";
import OptionReducer from "./options/reducer";

const rootReducer = combineReducers({
  PostReducer,
  OptionReducer
});

export default rootReducer;
