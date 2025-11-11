import { NavLink, Outlet } from "react-router";

function RootLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink> |{" "}
        <NavLink to="/courses">Courses</NavLink>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
