import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import useUserStore from "../context/useUserStore";

const AdminRoute = () => {
  const { user, fetchUser }: any = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user?.roles !== "admin") {
    console.log("Kamu bukan admin");

    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default AdminRoute;
