import { useNavigate, useParams } from "react-router";

const EventDetail = () => {
  // const { id } = useParams();
  const router = useNavigate();

  return (
    <div className="max-w-[600px] mx-auto h-screen p-5 relative">
      <button
        onClick={() => router(-1)}
        className="absolute top-5 left-5 bg-rose-400 text-sm px-3 py-2 text-white rounded-md"
      >
        Back
      </button>

      <div className="flex flex-col items-center gap-y-6">
        <h1 className="uppercase font-extrabold text-3xl">Title event</h1>
        <div className="bg-[#f3f3f3] w-full min-h-[300px] rounded-lg"></div>
        <div className="flex justify-between items-center w-full text-xs">
          <p>Tanggal : 02, November 2025</p>
          <p>Jumlah Peserta : 200</p>
        </div>
        <button className="py-3 text-sm text-white w-full font-semibold bg-[#ec520b] rounded-full">
          Daftar ke Event
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
