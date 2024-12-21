import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:3000/event", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" />; // Jika tidak terautentikasi, arahkan ke login
  }

  return <Outlet />; // Jika terautentikasi, tampilkan halaman yang dilindungi
};

export default ProtectedRoute;
