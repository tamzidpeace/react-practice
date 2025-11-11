import { useContext } from "react";
import "./App.css";
import CounterContext from "./context/CounterContext";

function App() {
  const context = useContext(CounterContext);

  const {count, setCount} = context;
  return (
    <>
      <h1>Home</h1>
      <div>count {count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </>
  );
}

export default App;
