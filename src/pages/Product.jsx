import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/getAssets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-2xl shadow-2xs"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-2xl shadow-xl" src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <h1 className="font-medium text-gray-500 text-xl mt-2">{productData.category}</h1>
          <div className="flex items-center gap-1 mt-2 w-3">
            <img src={assets.star} alt="" />
            <img src={assets.star} alt="" />
            <img src={assets.star} alt="" />
            <img src={assets.star} alt="" />
            <img src={assets.star} alt="" />
            <p className="pl-1 text-sm">(162)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          {/* Size Selection */}
          <div className="mt-6 w-110">
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="grid grid-cols-5 gap-4">
              {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13].map((size) => {
                const isAvailable = productData.size.includes(size.toString());
                return (
                  <div
                    key={size}
                    className={`border rounded-lg flex h-13 items-center justify-center text-lg font-normal cursor-pointer select-none ${
                      isAvailable
                        ? "hover:bg-gray-100 text-black"
                        : "line-through text-gray-400 bg-gray-100 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 w-130">
            <button className="flex-1 bg-blue-500 text-white py-3 h-13 cursor-pointer rounded-4xl font-medium hover:opacity-90 transition duration-200">
              Buy Now
            </button>
            <button className="flex-1 border border-black text-black py-3 h-13 cursor-pointer rounded-4xl font-medium hover:bg-gray-100 transition duration-200">
              Add to Cart
            </button>
          </div>
          {/* Shipping & Pickup */}
          <div className="mt-6 text-md font-bold space-y-1">
            <p className="">Shipping</p>
            <p className="font-medium">You'll see our shipping options at checkout.</p>

            <p className="font-medium pt-4">Free Pickup</p>
            <p className="text-blue-600 hover:underline cursor-pointer">Find a Store</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
