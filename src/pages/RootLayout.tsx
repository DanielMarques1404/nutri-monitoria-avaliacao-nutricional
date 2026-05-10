import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../app/context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
};

export default RootLayout;
