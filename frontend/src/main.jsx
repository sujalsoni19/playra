import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Login, Register } from "./pages/index.js";
import { UserProvider } from "./context/UserContext.jsx";
import Hero from "./components/Hero.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Hero />,
        path: "/",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
);
