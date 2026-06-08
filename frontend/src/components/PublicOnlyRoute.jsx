import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PublicOnlyRoute() {
  const { session, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={session.role === "ADMIN" ? "/admin" : "/dashboard"} replace />;
}
