import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useUserStore from "../../context/useUserStore";

const EventDetail = () => {
  const [eventID, setEventID] = useState<any>([]);
  const router = useNavigate();
  const { id } = useParams();
  const { user, fetchUser, isLoading, setIsLoading }: any = useUserStore();

  const getEventId = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/event/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setEventID(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getIntoEvent = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/event/addUser/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
          credentials: "include",
        }
      );

      setIsLoading(false);
      getEventId();

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    getEventId();
  }, [fetchUser]);

  const dateFormat = (dateString: string) => {
    const date = new Date(dateString);

    const options: any = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("id-ID", options);

    return formattedDate;
  };

  return (
    <div className="max-w-[600px] mx-auto h-screen p-5">
      <button
        onClick={() => router(-1)}
        className="absolute top-5 left-5 bg-rose-400 text-sm px-3 py-2 text-white rounded-md"
      >
        Back
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col items-center gap-y-6">
            <h1 className="uppercase font-extrabold text-3xl">
              {eventID.title}
            </h1>
            <div className="bg-[#f3f3f3] w-full min-h-[300px] rounded-lg"></div>
            <div className="flex justify-between items-center w-full text-xs">
              <p>Tanggal : {dateFormat(eventID.date)}</p>
              <p>Jumlah Peserta : {eventID.users?.length}</p>
            </div>
            <button
              onClick={getIntoEvent}
              className="py-3 text-sm text-white w-full font-semibold bg-[#ec520b] rounded-full disabled:bg-[#ec520b]/60"
              disabled={eventID.users?.some(
                (userEvent: any) => userEvent._id === user.id
              )}
            >
              Daftar ke Event
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetail;
