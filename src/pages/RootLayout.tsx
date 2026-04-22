import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../app/context/AuthContext";
import { QuestionnaireProvider } from "../app/context/QuestionnaireContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <QuestionnaireProvider>
        <Outlet />
        <ToastContainer />
      </QuestionnaireProvider>
    </AuthProvider>
  );
};

export default RootLayout;
