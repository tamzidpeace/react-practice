import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import About from "./About.jsx";
import RootLayout from "./RootLayout.jsx";
import Courses from "./Courses.jsx";
import Course from "./Course.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: App },
      { path: "about", Component: About },
      {
        path: "courses",
        Component: Courses,
        children: [{ path: ":courseId", Component: Course }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
