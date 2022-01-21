import * as action_type from "./action_type";
import initialState from "../../initialState";

const userReducer = function counterReducer(
  state = initialState.user,
  action
) {
  switch (action_type) {
    case action_type.USER_LOADING_STARTED: {
      const newState = { ...state, loading: true };
      return newState;
    }
    case action_type.USER_LOADING_SUCCEEDED: {
      const newState = {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.user,
      };
      return newState;
    }
    case action_type.USER_LOADING_FAILED: {
      const newState = {
        ...state,
        loading: false,
        loaded: false,
        data: action.payload.err,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default userReducer;
