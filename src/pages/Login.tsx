import { useNavigate } from "react-router";
import loginBg from "../assets/login-bg.jpg";
import { useState } from "react";
import useUserStore from "../context/useUserStore";

const Login = () => {
  const [name, setName] = useState("leonerss");
  const [password, setPassword] = useState("hello2");
  const navigate = useNavigate();

  const setUser = useUserStore((state: any) => state.setUser);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
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
    } else {
      alert("Login failed!");
    }
  };
  return (
    <div className="w-full h-screen max-h-[1000px] flex relative">
      <div className="absolute top-10 left-10 rounded-full bg-white z-10 w-fit h-fit">
        <div className="bg-[#ec520b]/80 rounded-full m-0.5 px-5 text-white text-xl">
          <p className="">Event</p>
        </div>
      </div>
      <div className="flex-1 h-full bg-[#ec520b]/80 relative">
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
              Don't have account?{" "}
              <span className="text-[#ec520b]">Sign up now</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
