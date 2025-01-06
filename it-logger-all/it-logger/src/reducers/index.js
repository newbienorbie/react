import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";

export default combineReducers({
  // state of log
  log: logReducer,
  tech: techReducer,
});
