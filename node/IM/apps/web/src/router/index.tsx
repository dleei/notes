import React from "react";
import type { RouteObject } from "react-router-dom";

const Layout = React.lazy(() => import("@/layout"));
const NotFount = React.lazy(() => import("@/views/404"));
const Home = React.lazy(() => import("@/views/Home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFount />,
  },
];

export default routes;
