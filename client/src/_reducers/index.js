//combineReducers 로 나눠져있는Reducer을 rootReducer에서 하나로 합쳐줌
import { combineReducers } from "redux";
import user from "./user_reducer";
//import comment from "./comment_reducer";

const rootReducer = combineReducers({
  user,
  //comment
});

export default rootReducer;
