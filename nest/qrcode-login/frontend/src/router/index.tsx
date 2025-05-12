import React from "react";
import type { RouteObject } from "react-router-dom";

const Layout = React.lazy(() => import("@/layout"));
const NotFount = React.lazy(() => import("@/views/404"));
const Home = React.lazy(() => import("@/views/Home"));
const Confirm = React.lazy(() => import("@/views/Confirm"));
const Result = React.lazy(() => import("@/views/Result"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "confirm",
        element: <Confirm />,
      },
      {
        path: "result",
        element: <Result />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFount />,
  },
];

export default routes;
