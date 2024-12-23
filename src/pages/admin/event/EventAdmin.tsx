import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useUserStore from "../../../context/useUserStore";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import toast from "react-hot-toast";

const EventAdmin = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | any>();
  const [formatDate, setFormatDate] = useState<any>();
  const router = useNavigate();
  const { setIsLoading, isLoading }: any = useUserStore();

  const getEventId = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/event/${id?.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      setTitle(data.title);
      setDate(data.date);
      setFormatDate(format(data.date, "MM/dd/yyyy"));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateSelect = (selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormatDate(format(selectedDate, "MM/dd/yyyy"));
    } else {
      setDate(null);
      setFormatDate("");
    }
  };

  const updateEvent = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/event/${id?.toString()}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, date: formatDate }),
          credentials: "include",
        }
      );

      setIsLoading(false);
      getEventId();
      const data = await response.json();

      if (response.ok) {
        toast.success(`Berhasil update ke event`);
      } else {
        toast.error(`Error : ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error saat update event`);
    }
  };

  const deleteEvent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/event/${id?.toString()}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      setIsLoading(false);

      if (response.ok) {
        toast.success(`Berhasil meng-hapus ke event`);

        router("/admin");
      } else {
        toast.error(`Gagal meng-hapus ke event`);
      }
    } catch (error) {
      toast.error(`Error saat meng-hapus event`);
    }
  };

  useEffect(() => {
    getEventId();
  }, []);

  return (
    <div className="max-w-[600px] mx-auto p-5">
      <button
        onClick={() => router("/admin")}
        className="absolute top-5 left-5 bg-rose-400 text-sm px-3 py-2 text-white rounded-md"
      >
        Back
      </button>
      {!isLoading ? (
        <form onSubmit={updateEvent} className="flex flex-col gap-y-4">
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
            Save Update
          </button>
          <button
            onClick={deleteEvent}
            className="py-3 text-sm text-white w-full font-semibold bg-rose-500 rounded-full"
          >
            Delete Event
          </button>
        </form>
      ) : (
        <>Loading..</>
      )}
    </div>
  );
};

export default EventAdmin;
