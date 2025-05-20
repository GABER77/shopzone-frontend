import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/getAssets";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";

const Collection = () => {
  const { search, setSearch, products, getAllProducts } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [shoeSize, setShoeSize] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const toggleShoeSize = (e) => {
    const value = e.target.value;
    setShoeSize((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    let result = products.slice();

    // 1. Filter by category
    if (category.length > 0) {
      result = result.filter((item) => category.includes(item.category));
    }

    // 2. Filter by shoe size
    if (shoeSize.length > 0) {
      result = result.filter((item) => item.size.some((size) => shoeSize.includes(size)));
    }

    // 3. Sort the result
    switch (sortType) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Relevant sort (no specific action needed)
        break;
    }

    // 4. Update the filteredProducts
    setFilteredProducts(result);
  }, [products, category, shoeSize, sortType]);

  useEffect(() => {
    return () => {
      setSearch(""); // Clear search when navigate to another screen
    };
  }, []);

  return (
    <div>
      {/* Search Bar at the top */}
      <div className="border-t border-b text-center mb-6 py-1">
        <div className="inline-flex items-center justify-center border border-gray-700 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-inherit text-sm"
            type="text"
            placeholder="Search"
          />
          <img className="w-4" src={assets.search} alt="" />
        </div>
      </div>

      {/* Main Layout: Filters + Products */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
        {/* Sidebar Filters */}
        <div className="min-w-60">
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

          {/* Shoe Size Filter */}
          <div className={`border border-gray-500 rounded-lg p-5 mt-6 bg-white ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-4 text-lg font-semibold tracking-wide">Shoe Sizes</p>
            <div className="flex flex-col gap-3 text-sm text-gray-900">
              {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"].map((size) => (
                <label key={size} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
                  <input type="checkbox" value={size} onChange={toggleShoeSize} className="w-4 h-4 accent-blue-500" />
                  US Size {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"Collections"} />
            <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-500 text-sm px-2">
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.map((item, index) => (
              <ProductCard
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
    </div>
  );
};

export default Collection;
