import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/getAssets";
import { CartContext } from "../context/CartContext";

const Product = () => {
  const { productId } = useParams();
  const { products, getAllProducts, currency, navigate } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

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
    getAllProducts();
  }, []);

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
          <p className="mt-4 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          {/* Size Selection */}
          <h3 className="text-lg mt-4">Select Size</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-2 max-w-[500px] ">
            {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13].map((size) => {
              const available = productData.sizes.includes(size);
              const selected = selectedSize === size;

              const baseClasses =
                "border rounded-lg flex h-13 items-center justify-center text-lg font-normal select-none transition-all";
              const availableClasses = available
                ? "text-black hover:bg-gray-100 cursor-pointer"
                : "text-gray-400 bg-gray-100 line-through cursor-not-allowed";
              const selectedClasses = selected && available ? "border-blue-500 border-3" : "";

              return (
                <button
                  key={size}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  className={`${baseClasses} ${availableClasses} ${selectedClasses}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 max-w-[500px] ">
            <button className="flex-1 bg-blue-500 text-white py-3 h-13 cursor-pointer rounded-4xl font-medium hover:opacity-90 transition duration-200">
              Buy Now
            </button>
            <button
              onClick={() => {
                if (user) {
                  addToCart(productId, selectedSize);
                } else {
                  navigate("/login");
                }
              }}
              className="flex-1 border border-black text-black py-3 h-13 cursor-pointer rounded-4xl font-medium hover:bg-gray-100 transition duration-200"
            >
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
      {/* Description & Reviews */}
      <div className="mt-10">
        {/* Tab Buttons */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-t-xl w-fit border border-b-0">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-2 text-sm font-semibold rounded-lg ${
              activeTab === "description" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-white"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2 text-sm font-semibold rounded-lg ${
              activeTab === "reviews" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-white"
            }`}
          >
            Reviews (162)
          </button>
        </div>

        {/* Content Area */}
        <div className="border rounded-b-xl rounded-tr-xl px-6 py-6 text-md">
          {activeTab === "description" ? <p>{productData.description}</p> : <p>Waiting!</p>}
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
