import * as action_type from "./action_type";
import initialState from "../../initialState";

const counterReducer = function counterReducer(
  state = initialState.counter,
  action
) {
  switch (action.type) {
    case actionTypes.INCREMENT: {
      const newValue = state + 1;
      return newValue;
    }
    case action_type.DECREMENT: {
      const newValue = state - 1;
      return newValue;
    }
    default:
      return state;
  }
};

export default counterReducer;
