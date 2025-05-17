import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/users/login`,
        { email, password },
        { withCredentials: true } // important to include cookie
      );

      // After login, fetch the current user data from /me endpoint
      const res = await axios.get(`${backendUrl}/users/me`, { withCredentials: true });
      setUser(res.data.data.user);

      window.location.href = "/"; // redirect to home

      console.log(response);
    } catch (err) {
      console.log(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="pt-23 pb-37 flex items-center justify-center">
      <div className="rounded-lg w-full max-w-sm p-6 border-1">
        <h2 className="text-xl font-semibold text-center mb-5">Log in</h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
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
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-sm text-right">
            <a href="#" className="text-gray-700 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full bg-blue-500 text-white py-2 rounded-3xl hover:opacity-90"
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
