import { UPDATE_FORM, UPDATE_ORDER, ADD_ORDER } from "../Types/types";

const initalState = {
  form: [],
  orders: [],
};

function formReducer(state = initalState, action) {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        form: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: Object.values(action.payload),
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
}

export default formReducer;
