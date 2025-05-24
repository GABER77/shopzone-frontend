import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import { assets } from "../assets/getAssets";

const Collection = () => {
  const { products, totalResults, getAllProducts, loading, search, setSearch } = useContext(ShopContext);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [category, setCategory] = useState([]);
  const [shoeSize, setShoeSize] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const totalPages = Math.ceil(totalResults / limit);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setPage(1);
    setCategory((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const toggleShoeSize = (e) => {
    const value = e.target.value;
    setPage(1);
    setShoeSize((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const getSortParam = () => {
    switch (sortType) {
      case "low-high":
        return "price";
      case "high-low":
        return "-price";
      default:
        return "-createdAt";
    }
  };

  const buildFilterParams = () => {
    const params = {};
    if (category.length) params.category = category;
    if (shoeSize.length) {
      const numericSizes = shoeSize.map(Number); // convert to numbers
      params["sizes[$in]"] = numericSizes; // send as $in operator
    }
    return params;
  };

  const fetchProducts = async () => {
    const filterParams = buildFilterParams();

    await getAllProducts({
      page,
      limit,
      sort: getSortParam(),
      ...filterParams,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [page, category, shoeSize, sortType, search]);

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

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        {/* Sidebar Filters */}
        <div className="min-w-60">
          <p className="text-xl font-semibold mb-4">FILTERS</p>

          {/* Category Filter */}
          <div className="border border-gray-500 rounded-lg p-5 bg-white mb-6">
            <p className="mb-4 text-lg font-semibold tracking-wide">Categories</p>
            <div className="flex flex-col gap-3 text-sm text-gray-900">
              {["Men's Shoes", "Women's Shoes", "Basketball Shoes", "Running Shoes"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleCategory}
                    checked={category.includes(type)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Shoe Size Filter */}
          <div className="border border-gray-500 rounded-lg p-5 bg-white">
            <p className="mb-4 text-lg font-semibold tracking-wide">Shoe Sizes</p>
            <div className="flex flex-col gap-3 text-sm text-gray-900 overflow-y-auto">
              {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"].map((size) => (
                <label key={size} className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
                  <input
                    type="checkbox"
                    value={size}
                    onChange={toggleShoeSize}
                    checked={shoeSize.includes(size)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  US Size {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3 text-xl">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />

            <select
              onChange={(e) => {
                setSortType(e.target.value);
                setPage(1);
              }}
              value={sortType}
              className="border-2 border-gray-500 text-sm w-45 h-8 px-2"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center py-10">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10">No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`px-4 py-2 rounded ${
                    page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>

                <span>
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={`px-4 py-2 rounded ${
                    page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
