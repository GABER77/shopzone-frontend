import React from "react";
import { assets } from "../assets/getAssets";

const Banner = () => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl">
      <img src={assets.banner} className="w-full h-[300px] md:h-[400px] object-cover" />
    </div>
  );
};

export default Banner;
