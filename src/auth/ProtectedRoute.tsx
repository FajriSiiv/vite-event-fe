import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import useUserStore from "../context/useUserStore";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    const checkMe = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Simpan data user ke Zustand
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

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
    // checkMe();
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
