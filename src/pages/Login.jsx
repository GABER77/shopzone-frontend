import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
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
