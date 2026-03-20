import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  PostVideo,
  Video,
  ChannelPage,
  Subscriptions,
  WatchHistory,
} from "./pages/index.js";
import {
  ChannelAbout,
  ChannelHome,
  ChannelPlaylists,
  ChannelPosts,
  ChannelVideos,
} from "./components/Channel/Channelindex.js";
import Feed from "./components/Feed.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Hero from "./components/Hero.jsx";
import App from "./App.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Hero />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "home",
            element: <Feed />,
          },
          {
            path: "subscriptions",
            element: <Subscriptions />,
          },
          {
            path: "watch-history",
            element: <WatchHistory />,
          },
          {
            path: "channel/:id",
            element: <ChannelPage />,
            children: [
              {
                index: true, // default
                element: <ChannelHome />,
              },
              {
                path: "videos",
                element: <ChannelVideos />,
              },
              {
                path: "playlists",
                element: <ChannelPlaylists />,
              },
              {
                path: "posts",
                element: <ChannelPosts />,
              },
              {
                path: "about",
                element: <ChannelAbout />,
              },
            ],
          },
        ],
      },
      {
        path: "post-video",
        element: (
          <ProtectedRoute>
            <PostVideo />
          </ProtectedRoute>
        ),
      },
      {
        path: "video/:id",
        element: (
          <ProtectedRoute>
            <Video />
          </ProtectedRoute>
        ),
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
