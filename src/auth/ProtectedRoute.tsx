import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(apiUrl + "/event", {
          method: "GET",
          credentials: "include",
        });
        const { message } = await response.json();

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          toast.error(`${message.error}`);
          toast.error(`${message.message}`);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
