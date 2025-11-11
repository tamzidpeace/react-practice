import { NavLink, Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Home</h1>

        <nav className="flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contract</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
