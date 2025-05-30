import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  const { products, getAllProducts } = useContext(ShopContext);

  useEffect(() => {
    getAllProducts({ page: 1, limit: 10, sort: "-createdAt" });
  }, []);

  return (
    <div>
      <div className="text-center py-6 text-3xl">
        <Title text1={"NEW"} text2={"ARRIVALS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore the newest trends and find your perfect style today!
        </p>
      </div>
      {/* Rendering Products Grid*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-7">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
            onSale={item.onSale}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
