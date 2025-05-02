import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/getAssets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-6 font-medium">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="w-14" alt="Logo" />
        <p className="font-bold text-3xl text-blue-500">ShopZone</p>
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
        <NavLink to="/about" className="flex flex-col items-center">
          <p>ABOUT</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-blue-500 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center">
          <p>CONTACT</p>
          <hr className="w-3/4 border-none h-[1.6px] bg-blue-500 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6.5">
        <div className="group relative">
          <img src={assets.profile} className="w-5.5 cursor-pointer" alt="" />
          <div className="group-hover:block hidden absolute dropdown-menu left-1/2 transform -translate-x-1/2 pt-4">
            <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart} className="w-6.5 cursor-pointer" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4.5 text-center leading-4 bg-amber-500 text-white aspect-square rounded-full text-[11px]">
            {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu} className="flex lg:hidden w-5 cursor-pointer" />
      </div>

      {/* Sidebar menu for small screens*/}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col">
          <div onClick={() => setVisible(false)} className="flex items-center gap-1 p-4 cursor-pointer">
            <img src={assets.back} className="h-3.5 " alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            Collection
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
