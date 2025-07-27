import React from "react";
import type { RouteObject } from "react-router-dom";

const Layout = React.lazy(() => import("@/layout"));
const NotFount = React.lazy(() => import("@/views/404"));
const Home = React.lazy(() => import("@/views/Home"));
const LoginPanel = React.lazy(() => import("@/views/LoginPanel"));

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
        path: "login",
        element: <LoginPanel />,
      },
      {
        path: "register",
        element: <LoginPanel />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFount />,
  },
];

export default routes;
