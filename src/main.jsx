import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import TvShows from "./pages/TvShows.jsx";
import Actors from "./pages/Actors.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import TvShowDetails from "./components/TvShowDetails.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id", // Dynamische Route für MovieDetails
        element: <MovieDetails />,
      },
      {
        path: "tv-shows",
        element: <TvShows />,
      },
      {
        path: "tv-shows/:id", // Dynamische Route für TvShowDetails
        element: <TvShowDetails />,
      },
      {
        path: "actors",
        element: <Actors />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
