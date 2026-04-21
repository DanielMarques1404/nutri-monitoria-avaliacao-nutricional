import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../app/hooks/useAuthContext";

export const ProtectedRoute = () => {
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/admin/login");
    }
  }, [session, navigate]);

  return <Outlet />;
};
