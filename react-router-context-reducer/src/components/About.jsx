import React, { useContext } from "react";
import AppContext from "../context/AppContext";

export default function About() {
  const context = useContext(AppContext);

  return (
    <div>
      About
      <div>count {context.count}</div>
      <button onClick={() => context.setCount(context.count + 1)}>
        increment
      </button>
    </div>
  );
}
