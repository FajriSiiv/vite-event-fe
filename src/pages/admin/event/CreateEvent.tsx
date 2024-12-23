import { useEffect, useState } from "react";
import useUserStore from "../../../context/useUserStore";
import { useNavigate } from "react-router";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | any>();
  const [formatDate, setFormatDate] = useState<any>();
  const { setIsLoading, isLoading, fetchUser, user }: any = useUserStore();
  const router = useNavigate();

  const handleDateSelect = (selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormatDate(format(selectedDate, "MM/dd/yyyy"));
    } else {
      setDate(null);
      setFormatDate("");
    }
  };

  const eventCreate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/event`, {
        body: JSON.stringify({
          userId: user?.id,
          title: title,
          date: formatDate,
          users: [],
        }),
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setIsLoading(false);

      if (response.ok) {
        router("/admin");
        toast.success("Event berhasil dibuat");
      } else {
        toast.error(data.message.message[0] || "Event gagal dibuat");
      }
    } catch (error) {
      console.log("Error ketika membuat event");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="max-w-[600px] mx-auto p-5">
      <button
        onClick={() => router("/admin")}
        className="absolute top-5 left-5 bg-rose-400 text-sm px-3 py-2 text-white rounded-md"
      >
        Back
      </button>
      {!isLoading ? (
        <form onSubmit={eventCreate} className="flex flex-col gap-y-4">
          <div className="h-[200px] bg-[#f3f3f3] w-full rounded-md"></div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="">Title Event</label>
            <input
              type="text"
              placeholder="Name"
              className="bg-[#f3f3f3] px-4 py-3 rounded-full text-sm min-w-[400px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <DayPicker
            classNames={{
              today: `border-amber-500`,
              selected: `bg-amber-500 border-amber-500 text-white p-3 rounded-md`,
              root: ` shadow-lg p-2`,
              chevron: ` fill-amber-500 `,
              day: "p-3",
              month_caption: "text-xl font-bold mb-1",
              months: "relative",
              nav: "absolute right-2",
              weeks: "grid grid-rows-5 ",
              week: "grid grid-cols-7 text-center",
              weekdays: "grid grid-cols-7 ",
              month_grid: "w-full",
            }}
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            footer={formatDate ? `Selected: ${formatDate}` : "Pick a day."}
          />

          <button
            className="py-3 text-sm text-white w-full font-semibold bg-[#ec520b] rounded-full"
            type="submit"
          >
            Create New Event
          </button>
          {/* <button
            onClick={deleteEvent}
            className="py-3 text-sm text-white w-full font-semibold bg-rose-500 rounded-full"
          >
            Delete Event
          </button> */}
        </form>
      ) : (
        <>Loading..</>
      )}
    </div>
  );
};

export default CreateEvent;
