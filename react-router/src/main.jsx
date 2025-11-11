import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import {AppContextProvider} from "./contexts/AppContext.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
