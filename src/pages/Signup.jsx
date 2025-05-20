import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { UserContext } from "../context/UserContext";
import { assets } from "../assets/getAssets";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match", {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/users/signup`,
        { name: username, email, password, passwordConfirm },
        { withCredentials: true }
      );

      setUser(res.data.user);

      toast.success("Account created successfully!", {
        position: "top-left",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 3000); // redirect after 3 seconds
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      {/* Logo top-left */}
      <Link to="/" className="absolute top-4 left-0 flex items-center gap-2">
        <img src={assets?.logo || "/logo.png"} alt="Logo" className="w-10 sm:w-14" />
        <span className="text-xl sm:text-3xl font-bold text-blue-500">ShopZone</span>
      </Link>

      {/* Signup Form */}
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow border">
        <h2 className="text-2xl font-semibold text-center mb-6">Create new account</h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="yourname"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-3xl hover:opacity-90 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
