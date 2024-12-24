import { useNavigate, useSearchParams } from "react-router";
import useUserStore from "../../context/useUserStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const AdminPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const router = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [pages, setPages] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleEventClick = (id: number) => {
    router("/admin/event/" + id);
  };

  const { fetchUser, isLoading, setIsLoading }: any = useUserStore();

  const getAllEvents = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/event?limit=4&page=${pages}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setAllEvents(data.data || []);
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPages(newPage);
    router(`?page=${newPage}`, { replace: true });
  };

  useEffect(() => {
    const currentPage: any = parseInt(searchParams.get("page") || "1", 10);

    if (!currentPage) {
      setSearchParams({ page: "1" });
    } else {
      setPages(parseInt(currentPage, 10));
    }

    setIsReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isReady) return;

    getAllEvents();
    router(`?page=${pages}`, { replace: true });
    fetchUser();
  }, [fetchUser, pages, isReady]);

  if (isLoading) return <p>Loading..</p>;

  return (
    <div>
      <div className="col-span-4 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">Event yang tersedia</h1>
          <div className="w-full min-h-[220px] bg-[#f3f3f3] p-4 rounded-md grid gap-3 grid-cols-4 md:grid-cols-2 sm:flex sm:flex-col">
            {allEvents.length === 0 && !isLoading && <p>No events found.</p>}
            {allEvents?.map((event: any, index) => (
              <div
                className="bg-slate-200 rounded-md "
                onClick={() => handleEventClick(event._id)}
                key={index}
              >
                <div className="w-full h-[220px] flex flex-col justify-between p-5 overflow-hidden">
                  <div className="flex flex-col">
                    <span className="font-bold text-3xl">{event.title}</span>
                    <span className="font-base text-1xl">
                      {format(event.date, "eeee, dd-MM-yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                  <span className="font-bold text-xl">
                    Peserta : {event.users.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center gap-10">
          <button
            className="bg-[#f3f3f3] py-2 px-4 rounded-md font-semibold disabled:text-gray-400"
            onClick={() => handlePageChange(pages - 1)}
            disabled={pages === 1 || pages <= 1 || isLoading}
          >
            Prev
          </button>
          <span className="font-bold">{pages}</span>
          <button
            className="bg-[#f3f3f3] py-2 px-4 rounded-md font-semibold disabled:text-gray-400"
            onClick={() => handlePageChange(pages + 1)}
            disabled={isLoading || allEvents.length < 4}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="fixed bottom-5 right-5 h-10 w-10 rounded-full bg-emerald-500 flex justify-center items-center text-white font-black text-4xl cursor-pointer"
        onClick={() => router("/admin/event/create")}
      >
        +
      </div>
    </div>
  );
};

export default AdminPage;
