import { CHECK_EXP, LOG_IN, LOG_OUT, CHANGE_PASSWORD } from "../Types/types";

const initalState = {
  idToken: localStorage.getItem("idToken"),
  userId: localStorage.getItem("userId"),
  expiresDate: localStorage.getItem("expiresDate"),
};

function authReducer(state = initalState, action) {
  switch (action.type) {
    case LOG_IN:
    case CHANGE_PASSWORD:
      let expiresDate =
        new Date().getTime() + parseInt(action.payload.expiresIn, 10) * 1000;

      localStorage.setItem("expiresDate", expiresDate);
      localStorage.setItem("userId", action.payload.localId);
      localStorage.setItem("idToken", action.payload.idToken);

      return {
        ...state,
        idToken: action.payload.idToken,
        userId: action.payload.localId,
        expiresDate: expiresDate,
      };

    case LOG_OUT:
      localStorage.removeItem("idToken");
      localStorage.removeItem("expiresDate");
      localStorage.removeItem("userId");
      return {
        ...state,
        idToken: null,
        userId: null,
        expiresDate: null,
      };
    case CHECK_EXP:
      if (
        new Date().getTime() > parseInt(localStorage.getItem("expiresDate"), 10)
      ) {
        return {
          ...state,
          idToken: null,
          userId: null,
          expiresDate: null,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default authReducer;
