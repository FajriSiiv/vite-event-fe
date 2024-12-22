import { useNavigate, useSearchParams } from "react-router";
import useUserStore from "../../context/useUserStore";
import { useEffect, useState } from "react";

const AdminPage = () => {
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
      const response = await fetch(
        `http://localhost:3000/event?limit=4&page=${pages}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

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
      {/* <div className="col-span-1 w-full h-full relative">
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
      </div> */}
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
            {allEvents.length === 0 && !isLoading && <p>No events found.</p>}
            {allEvents?.map((event: { _id: any }, index) => (
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
            className="bg-[#f3f3f3] py-2 px-4 rounded-md font-semibold"
            onClick={() => handlePageChange(pages + 1)}
            disabled={isLoading}
          >
            Next
          </button>
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
