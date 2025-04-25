import React from "react";
import { Link, NavLink } from "react-router-dom";
import { icons } from "../assets/getIcon";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-6 font-medium">
      <div className="flex items-center gap-2">
        <img src={icons.logo} className="w-15" alt="Logo" />
        <p className="font-bold text-3xl text-emerald-700">ShopZone</p>
      </div>

      <ul className="hidden sm:flex gap-6 text-gray-800 absolute left-1/2 transform -translate-x-1/2">
        <NavLink to="/" className="flex flex-col items-center">
          <p>HOME</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-emerald-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center">
          <p>COLLECTION</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-emerald-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center">
          <p>ABOUT</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-emerald-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center">
          <p>CONTACT</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-emerald-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6.5">
        <img src={icons.search} className="w-5 cursor-pointer" alt="" />

        <div className="group relative">
          <img src={icons.profile} className="w-5.5 cursor-pointer" alt="" />
          <div className="group-hover:block hidden absolute dropdown-menu left-1/2 transform -translate-x-1/2 pt-4">
            <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={icons.cart} className="w-6.5 cursor-pointer" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4.5 text-center leading-4 bg-amber-500 text-white aspect-square rounded-full text-[11px]">
            8
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
