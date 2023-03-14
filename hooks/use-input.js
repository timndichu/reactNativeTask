import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "CLEAR") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatchFn] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (value) => {
    dispatchFn({ type: "INPUT", value: value});
  };

  const inputBlurHandler = (event) => {
    dispatchFn({ type: "BLUR" });
  };

  const clearInputHandler = () => {
    dispatchFn({ type: "CLEAR" });
  };

  return {
    value: inputState.value,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    clearInputHandler,
  };
};

export default useInput;
