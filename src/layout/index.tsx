import { Outlet, useNavigate } from "react-router";
import useUserStore from "../context/useUserStore";
import toast from "react-hot-toast";

const Layout = () => {
  const router = useNavigate();
  const { user, setIsLoading }: any = useUserStore();

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoading(false);
      const { message } = await response.json();

      if (response.ok) {
        router("/");
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error logout");
    }
  };

  return (
    <div className="w-full h-screen p-5 gap-10 grid grid-cols-5">
      <div className="col-span-1 w-full h-full relative">
        <div className="bg-[#f3f3f3] sticky top-10 w-full h-[300px] rounded-md flex flex-col gap-y-5 p-3">
          <button
            className="w-full rounded-md bg-white py-3"
            onClick={() => router("/dashboard")}
          >
            Events
          </button>
          {user?.roles === "admin" ? (
            <button
              className="w-full rounded-md bg-white py-3"
              onClick={() => router("/admin")}
            >
              Admin
            </button>
          ) : null}
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-2">
        <div className="flex justify-end">
          <div className="flex gap-x-2 justify-center items-center">
            <span className="text-sm capitalize">Hello, {user?.user}</span>
            <div className="h-10 w-10 rounded-full bg-rose-500"></div>
            <button
              onClick={logout}
              className="bg-rose-400 text-sm px-2 py-1 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
