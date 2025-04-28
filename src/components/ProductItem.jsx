import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, images, name, price, onSale, category }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="cursor-pointer" to={`/product/${id}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Conditionally render "On Sale" label */}
        {onSale && (
          <div className="absolute top-0 left-0 bg-red-500 text-white py-1 px-4 text-xs font-bold rounded-br-lg z-10">
            On Sale
          </div>
        )}

        {/* Apply hover effect only to the image */}
        <img className="transition transform hover:scale-110 hover:transform-none ease-in-out" src={images[0]} alt="" />
      </div>
      <p className="pt-3 pb-1 font-medium">{name}</p>
      <p className="pb-1 text-md text-gray-700">{category}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
