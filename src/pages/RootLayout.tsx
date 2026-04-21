import { AuthProvider } from "../app/context/AuthContext";
import { QuestionnaireProvider } from "../app/context/QuestionnaireContext";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <AuthProvider>
      <QuestionnaireProvider>
        <Outlet />
      </QuestionnaireProvider>
    </AuthProvider>
  );
};

export default RootLayout;
