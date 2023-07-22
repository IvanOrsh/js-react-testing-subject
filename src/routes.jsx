import { createBrowserRouter } from "react-router-dom";

import {
  Layout,
  MoviesPage,
  MovieDetailPage,
  ActorDetailPage,
  ProfilePage,
  ErrorPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MoviesPage />,
      },
      {
        path: "approved",
        element: <MoviesPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "actors/:id",
        element: <ActorDetailPage />,
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
