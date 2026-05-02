import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import { Admin } from "../pages/Admin";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../pages/ProtectedRoute";
import RootLayout from "../pages/RootLayout";

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
            path: "",
            element: <Admin />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
