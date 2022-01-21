import * as actionType from "./action_type";

export function loadUser() {
  return async function (dispatch) {
    dispatch({ type: action_type.USER_LOADING_STARTED });

    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/user");
      const user = await data.json();

      dispatch({
        type: action_type.USER_LOADING_SUCCEEDED,
        payload: { users },
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: action_type.USER_LOADING_FAILED, payload: { err } });
    }
  };
}
