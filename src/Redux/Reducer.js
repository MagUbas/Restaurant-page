import menuReducer from "./Reducers/menuReducer";
import formReducer from "./Reducers/formReducer";
import authReducer from "./Reducers/authReducer";
import { combineReducers } from "redux";
import { RESET_FORM, RESET_STORE } from "./Types/types";

const appReducer = combineReducers({
  menuReducer,
  formReducer,
  authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  if (action.type === RESET_FORM) {
    state.formReducer = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
