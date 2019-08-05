import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  errors: errorReducer,
  item: itemReducer
});
