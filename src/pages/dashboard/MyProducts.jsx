import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/getAssets";

const MyProducts = () => {
  const { myProducts, getMyProducts, deleteProduct, loading, totalResults, navigate } = useContext(ShopContext);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const totalPages = Math.ceil(totalResults / limit);
  console.log(totalPages);
  console.log(totalResults);

  useEffect(() => {
    getMyProducts({ page, limit, fields: "images, name, category, price" });
  }, [page]);

  const handleDelete = async (e, productId) => {
    e.stopPropagation(); // Prevent another click
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) await deleteProduct(productId);
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="relative overflow-x-auto">
      {/* Loading overlay */}
      {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center" />}

      {myProducts?.length > 0 ? (
        <table className="min-w-[700px] w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleNavigate(product._id)}
                className="hover:bg-gray-50 border-b transition cursor-pointer"
              >
                <td className="p-3">
                  <img src={product.images[0]} alt={product.name} className="w-18 h-18 object-cover rounded-lg" />
                </td>
                <td className="p-4 text-lg font-medium max-w-xs truncate">{product.name}</td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 text-gray-800 font-semibold">${product.price}</td>
                <td className="p-4">
                  <img
                    src={assets.trash}
                    alt="Delete"
                    className="w-5 h-5 cursor-pointer hover:opacity-70"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(e, product._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-6 text-center text-xl">No products published yet.</div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded ${
            page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
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
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyProducts;
