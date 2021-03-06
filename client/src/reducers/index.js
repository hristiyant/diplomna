import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";

const allReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  events: eventReducer
});

export default allReducers
