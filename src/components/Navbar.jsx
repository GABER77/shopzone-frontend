import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/getAssets";
import { ShopContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, navigate } = useContext(ShopContext);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [visible]);

  return (
    <div className="flex items-center justify-between mt-4 mb-6 font-medium">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="w-10 sm:w-14" alt="Logo" />
        <p className="font-bold text-xl sm:text-3xl text-blue-500">ShopZone</p>
      </div>

      <ul className="hidden lg:flex gap-6 text-gray-800 absolute left-1/2 transform -translate-x-1/2">
        <NavLink to="/" className="flex flex-col items-center">
          <p>HOME</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-blue-500 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center">
          <p>COLLECTION</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-blue-500 hidden" />
        </NavLink>

        {(user?.role === "admin" || user?.role === "seller") && (
          <NavLink to="/dashboard" className="flex flex-col items-center">
            <p>DASHBOARD</p>
            <hr className="w-3/4 border-none h-[1.6px] bg-blue-500 hidden" />
          </NavLink>
        )}

        <NavLink className="flex flex-col items-center">
          <p>ABOUT</p>
        </NavLink>
        <NavLink className="flex flex-col items-center">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-8">
        {user ? (
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <img
              src={user.image}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => (e.style.display = "none")}
            />
            <span className="font-medium">{user.name?.split(" ")[0] || "User"}</span>
          </div>
        ) : (
          <div className="group relative">
            <button onClick={() => navigate("/login")} className="py-2.5 px-5 cursor-pointer">
              Log in
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white w-25 py-2.5 cursor-pointer rounded-3xl hover:opacity-90"
            >
              Sign up
            </button>
          </div>
        )}

        {/* Cart Icon */}
        {user && (
          <Link to="/cart" className="relative">
            <img src={assets.cart} className="w-6.5 cursor-pointer" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4.5 text-center leading-4 bg-blue-500 text-white aspect-square rounded-full text-[11px]">
              {getCartCount()}
            </p>
          </Link>
        )}

        {/* Logout Icon */}
        {user && <img onClick={logout} src={assets.logout} className="w-5.5 cursor-pointer" alt="" />}

        {/* Sidebar Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu} className="flex lg:hidden w-5 cursor-pointer" />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col">
          <div onClick={() => setVisible(false)} className="flex items-center gap-1 p-4 cursor-pointer">
            <img src={assets.back} className="h-3.5" alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            Collection
          </NavLink>

          {(user?.role === "admin" || user?.role === "seller") && (
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/dashboard">
              Dashboard
            </NavLink>
          )}

          <a onClick={() => setVisible(false)} className="py-2 pl-6 border cursor-pointer">
            About
          </a>
          <a onClick={() => setVisible(false)} className="py-2 pl-6 border cursor-pointer">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
