import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white rounded-3xl p-8 mb-6 mt-8">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 text-sm">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img className="w-20" src="/logo.png" alt="ShopZone Logo" />
            <p className="font-bold text-3xl text-blue-500">ShopZone</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 max-w-xs">
            Your ultimate destination for the latest trends in footwear, blending comfort, quality, and style. Whether
            you're stepping out for adventure or relaxing at home, our carefully curated collections ensure you move
            confidently and comfortably every day.
          </p>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold mb-2 text-gray-400">Company</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer">Delivery</li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold mb-2 text-gray-400">Support</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
            <li className="hover:text-blue-400 cursor-pointer">Returns</li>
            <li className="hover:text-blue-400 cursor-pointer">Order Tracking</li>
          </ul>
        </div>

        {/* Footer bottom text full width */}
        <div className="col-span-full">
          <hr className="pb-6" />
          <p className=" text-center text-sm">
            &copy; {new Date().getFullYear()} by Mohamed Gaber - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
