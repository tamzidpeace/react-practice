import { NavLink, Route } from "react-router";
import App from "./App";

const About = () => {
  return (
    <div>
      <h1>About</h1>

        <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default About;