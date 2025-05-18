import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { UserContext } from "../context/UserContext";
import { assets } from "../assets/getAssets"; // optional

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${backendUrl}/users/login`,
        { email, password },
        { withCredentials: true } // important to include cookie
      );

      const res = await axios.get(`${backendUrl}/users/me`, { withCredentials: true });
      setUser(res.data.user);

      window.location.href = "/";
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      {/* Logo in top-left */}
      <Link to="/" className="absolute top-4 left-0 flex items-center gap-2">
        <img src={assets?.logo || "/logo.png"} alt="Logo" className="w-10 sm:w-14" />
        <span className="text-xl sm:text-3xl font-bold text-blue-500">ShopZone</span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow border">
        <h2 className="text-2xl font-semibold text-center mb-6">Log in</h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-sm text-right">
            <a href="#" className="text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-3xl cursor-pointer hover:opacity-90 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
