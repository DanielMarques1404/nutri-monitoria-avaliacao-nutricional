import { createBrowserRouter, Outlet } from "react-router-dom";
import { ProtectedRoute } from "../pages/ProtectedRoute";
import RootLayout from "../pages/RootLayout";
import App from "../App";
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Outlet />,
        children: [{ path: "", element: <App /> }],
      },
      {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          // {
          //   path: "register",
          //   element: <Register />,
          // },
        ],
      },
    ],
  },
]);