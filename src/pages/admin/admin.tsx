import { useNavigate } from "react-router";
import useUserStore from "../../context/useUserStore";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const router = useNavigate();
  const [allEvents, setAllEvents] = useState([]);

  const handleEventClick = (id: number) => {
    router("/admin/event/" + id);
  };

  const { user, fetchUser, isLoading, setIsLoading }: any = useUserStore();

  const getAllEvents = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/event?limit=5`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setAllEvents(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  useEffect(() => {
    getAllEvents();
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <p>Loading..</p>;

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
            {allEvents.map((event: { _id: any }, index) => (
              <div
                className="bg-slate-400 rounded-md"
                onClick={() => handleEventClick(event._id)}
                key={index}
              >
                <div className="w-full h-[220px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-5 right-5 h-10 w-10 rounded-full bg-emerald-500 flex justify-center items-center text-white font-black text-4xl cursor-pointer"
        onClick={() => router("/admin/event/create")}
      >
        +
      </div>
    </div>
  );
};

export default AdminPage;
