import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-12">
      <div className="text-2xl mb-2">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b py-5"
          >
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img src={item.images[0]} alt="" className="w-28 h-28 object-cover rounded-2xl shadow-md" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-md text-gray-600">{item.category}</p>
              <p className="text-md mt-1">Size: {item.size?.[0] || "N/A"}</p>
              <p className="font-medium text-lg mt-1.5">
                {currency}
                {item.price}
              </p>
            </div>

            {/* Status */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <p className="text-md text-green-600">Out for delivery</p>
            </div>

            {/* Button */}
            <div className="flex justify-center md:justify-end">
              <button className="bg-blue-500 text-white py-2.5 px-8 cursor-pointer rounded-3xl hover:opacity-90">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
