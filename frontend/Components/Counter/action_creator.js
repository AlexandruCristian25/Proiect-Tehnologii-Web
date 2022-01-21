import * as action_type from "./action_type";

export const increment = function increment() {
  return { type: action_type.INCREMENT };
};

export const decrement = function decrement() {
  return { type: action_type.DECREMENT };
};
