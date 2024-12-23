import { useNavigate } from "react-router";
import loginBg from "../assets/login-bg.jpg";
import { useState } from "react";
import useUserStore from "../context/useUserStore";
import toast from "react-hot-toast";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [checkUser, setCheckUser] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setUser = useUserStore((state: any) => state.setUser);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (name.length < 4 || password.length < 4) {
      toast.error("nama/password harus lebih dari 4");
      return;
    }

    if (name.length > 50 || password.length > 50) {
      toast.error("nama/password tidak boleh dari 50");
      return;
    }

    const response = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      navigate("/dashboard");
      toast.success("Login successfully!");
      toast.success(`Welcome back, ${data.user.name}`);
    } else {
      toast.error("Login failed!");
    }
  };

  return (
    <>
      <div className="w-full h-screen max-h-[1000px] flex relative">
        <div className="absolute top-10 left-10 rounded-full bg-white z-10 w-fit h-fit">
          <div className="bg-[#ec520b]/80 rounded-full m-0.5 px-5 text-white text-xl">
            <p className="">Event</p>
          </div>
        </div>
        <div className="flex-1 h-full bg-[#ec520b]/80 relative sm:hidden">
          <img
            src={loginBg}
            alt="Login background"
            className="object-cover w-full h-full object-bottom"
          />
        </div>
        <div className="flex-1 h-full flex justify-center items-center gap-y-5 flex-col">
          <h1 className="text-3xl font-semibold">Sign in Events</h1>
          <form className="flex flex-col gap-y-3 px-10" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Name"
              className="bg-[#f3f3f3] px-4 py-3 rounded-full text-sm min-w-[400px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="bg-[#f3f3f3] px-4 py-3 rounded-full text-sm min-w-[400px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="py-3 text-sm text-white w-full font-semibold bg-[#ec520b] rounded-full"
              type="submit"
            >
              Sign in
            </button>
            <div className="flex">
              <p className="text-sm">
                Can't login?{" "}
                <button
                  onClick={() => setCheckUser(true)}
                  className="text-[#ec520b]"
                  type="button"
                >
                  Check user here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-h-fit w-2/3 bg-gray-900 z-20 rounded-md text-white ${
          !checkUser ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => setCheckUser(false)}
          className="absolute right-5 top-2 bg-rose-600 p-2 rounded-md"
        >
          Close
        </button>
        <h2 className="text-center my-2 font-bold text-3xl">
          Login with this user
        </h2>
        <div className="w-full h-full grid grid-cols-3 gap-5 p-5">
          <div className="flex flex-col gap-y-2 p-2 bg-emerald-500 rounded-md">
            <span>Name : admin</span>
            <span>Password :admin</span>
            <span>Roles : admin</span>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              className="flex flex-col gap-y-2 p-2 bg-gray-500 rounded-md"
            >
              <span>Name : user{num}</span>
              <span>Password : user{num}</span>
              <span>Roles : user</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
