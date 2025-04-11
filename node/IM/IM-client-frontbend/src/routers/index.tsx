import React from "react";
import { Navigate } from "react-router-dom";

const Layout = React.lazy(() => import("../layouts"));
const NotFount = React.lazy(() => import("../views/404"));
const Home = React.lazy(() => import("../views/Home"));
const Chat = React.lazy(() => import("../views/Chat"));
const Group = React.lazy(() => import("../views/Group"));
const Contacts = React.lazy(() => import("../views/Contacts"));
const Setting = React.lazy(() => import("../views/Setting"));
const Space = React.lazy(() => import("../views/Space"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to="/chat" replace />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "group",
            element: <Group />,
          },
          {
            path: "contacts",
            element: <Contacts />,
          },
          {
            path: "group",
            element: <Group />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
          {
            path: "space",
            element: <Space />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFount />,
  },
];

export default routes;
