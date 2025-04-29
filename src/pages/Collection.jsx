import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/getAssets";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-7 border-t">
      {/* Filter Options */}
      <div className=" min-w-60">
        <div onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-1">
          <p className="text-xl flex items-center font-semibold tracking-wide">FILTERS</p>
          <img className={`h-4 sm:hidden ${showFilter ? "rotate-270" : "rotate-180"}`} src={assets.back} alt="" />
        </div>
        {/* Category Filter */}
        <div className={`border border-gray-500 rounded-lg p-5 mt-6 bg-white ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-4 text-lg font-semibold tracking-wide">Categories</p>

          <div className="flex flex-col gap-3 text-sm text-gray-900">
            {["Men's Shoes", "Women's Shoes", "Basketball Shoes", "Running Shoes"].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
                <input type="checkbox" value={type} className="w-4 h-4 accent-blue-500" />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Shoes Size Filter */}
        <div className={`border border-gray-500 rounded-lg p-5 mt-6 bg-white ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-4 text-lg font-semibold tracking-wide">Shoe Sizes</p>

          <div className="flex flex-col gap-3 text-sm text-gray-900">
            {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"].map((size) => (
              <label key={size} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
                <input type="checkbox" value={size} className="w-4 h-4 accent-blue-500" />
                US Size {size}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
