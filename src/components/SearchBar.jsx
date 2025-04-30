import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/getAssets";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className="border-t text-center">
      <div className="inline-flex items-center justify-center border border-gray-700 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search} alt="" />
      </div>
      <img
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
        className="inline w-3.5 cursor-pointer"
        src={assets.x}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
