import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/getAssets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [shoeSize, setShoeSize] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const toggleShoeSize = (e) => {
    const value = e.target.value;
    setShoeSize((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (shoeSize.length > 0) {
      productsCopy = productsCopy.filter((item) => item.size.some((size) => shoeSize.includes(size)));
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, shoeSize]);

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
                <input type="checkbox" value={type} onChange={toggleCategory} className="w-4 h-4 accent-blue-500" />
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
                <input type="checkbox" value={size} onChange={toggleShoeSize} className="w-4 h-4 accent-blue-500" />
                US Size {size}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"Collections"} />

          {/* Product Sort */}
          <select className="border-2 border-gray-500 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
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
    </div>
  );
};

export default Collection;
