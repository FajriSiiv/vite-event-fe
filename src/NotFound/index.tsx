import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full justify-center items-center flex-col gap-y-4">
      <h1 className="text-3xl font-extrabold">404 - Page Not Found</h1>
      <p>Redirecting to dashboard...</p>
    </div>
  );
};

export default NotFoundPage;
