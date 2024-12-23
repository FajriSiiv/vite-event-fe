import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import useUserStore from "../context/useUserStore";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const { user, fetchUser }: any = useUserStore();
  const [isNotAdmin, setIsNotAdmin] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user && user.roles !== "admin") {
      toast.error("Kamu bukan admin");
      setIsNotAdmin(true);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isNotAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default AdminRoute;
