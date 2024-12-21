const EventAdmin = () => {
  return (
    <div className="max-w-[600px] mx-auto p-5">
      <form action="" className="flex flex-col gap-y-4">
        <div className="h-[200px] bg-[#f3f3f3] w-full rounded-md"></div>
        <div className="flex flex-col gap-y-3">
          <label htmlFor="">Title Event</label>
          <input
            type="text"
            placeholder="Name"
            className="bg-[#f3f3f3] px-4 py-3 rounded-full text-sm min-w-[400px]"
          />
        </div>

        <button
          className="py-3 text-sm text-white w-full font-semibold bg-[#ec520b] rounded-full"
          type="submit"
        >
          Save Update
        </button>
      </form>
    </div>
  );
};

export default EventAdmin;
