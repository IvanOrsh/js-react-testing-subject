import { createBrowserRouter } from "react-router-dom";

import {
  Layout,
  ActorDetailPage,
  ErrorPage,
  HomePage,
  MovieDetailPage,
  MoviesPage,
  ProfilePage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/:id",
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
