import React from "react";

export default function Contact() {
  const countReducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      default:
        return state;
    }
  };
  
  const [state, dispatch] = React.useReducer(countReducer, 0);
  return (
    <div>
      Contact
      <div>count {state}</div>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
    </div>
  );
}
