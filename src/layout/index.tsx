import { Outlet, useNavigate } from "react-router";
import useUserStore from "../context/useUserStore";

const Layout = () => {
  const router = useNavigate();
  const { user }: any = useUserStore();

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
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
