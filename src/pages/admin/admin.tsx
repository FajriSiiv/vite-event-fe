import { useNavigate } from "react-router";

const AdminPage = () => {
  const router = useNavigate();

  const handleEventClick = (id: number) => {
    router("/admin/event/" + id);
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
          <button
            className="w-full rounded-md bg-white py-3"
            onClick={() => router("/admin")}
          >
            Admin
          </button>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-end">
            <div className="flex gap-x-2 justify-center items-center">
              <span className="text-sm">Hello, Fajri</span>
              <div className="h-10 w-10 rounded-full bg-rose-500"></div>
              <button
                onClick={() => router("/")}
                className="bg-rose-400 text-sm px-2 py-1 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold">Event yang tersedia</h1>
          <div className="w-full min-h-[220px] bg-[#f3f3f3] p-4 rounded-md grid gap-3 grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7].map((_) => (
              <div
                className="bg-slate-400 rounded-md"
                onClick={() => handleEventClick(_)}
                key={_}
              >
                <div className="w-full h-[220px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
