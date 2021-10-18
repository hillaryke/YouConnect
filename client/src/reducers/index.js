import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";

export default combineReducers({
   alerts: alertReducer,
   auth: authReducer,
   profile: profileReducer,
   post: postReducer
});