import React from "react";
import type { RouteObject } from "react-router-dom";

const Layout = React.lazy(() => import("@/layout"));
const NotFount = React.lazy(() => import("@/views/404"));
const Home = React.lazy(() => import("@/views/Home"));
const Login = React.lazy(() => import("@/views/Login"));
const Register = React.lazy(() => import("@/views/Register"));

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
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFount />,
  },
];

export default routes;
