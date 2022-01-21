import { Fragment } from "react";
import { increment, decrement } from "./action_creator";
import { getCounter } from "./selector";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function counter() {
  const dispatch = useDispatch();
  const counter = useSelector(getCounter, shallowEqual);

  function callIncrement() {
    dispatch(increment());
  }

  function callDecrement() {
    dispatch(decrement());
  }

  return (
    <Fragment>
      <h1>Counter value: {counter}</h1>
      <button onClick={callIncrement}>+</button>
      <button onClick={callDecrement}>-</button>
    </Fragment>
  );
}

export default counter;
