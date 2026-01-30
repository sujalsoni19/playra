import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Login, Register, Home } from "./pages/index.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Hero from "./components/Hero.jsx";
import App from "./App.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: (
          <PublicRoute>
            <Hero />
          </PublicRoute>
        ),
        path: "/",
      },
      {
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
        path: "/register",
      },
      {
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        path: "/login",
      },
      {
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        path: "/home",
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
