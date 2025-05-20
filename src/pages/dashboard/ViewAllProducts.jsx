import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/getAssets";

const ViewAllProducts = () => {
  const { products, getAllProducts, deleteProduct, loading } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (e, productId) => {
    e.stopPropagation(); // Prevent card click
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted!", { position: "top-left" });
        getAllProducts(); // Refresh page
      } catch {
        // Do nothing; error already handled inside addProduct
      }
    }
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative overflow-x-auto">
      {/* Loading overlay */}
      {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center" />}

      {products?.length > 0 ? (
        <table className="min-w-[700px] w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...products].reverse().map((product) => (
              <tr
                key={product._id}
                onClick={() => handleNavigate(product._id)}
                className="hover:bg-gray-50 border-b transition cursor-pointer"
              >
                <td className="p-3">
                  <img src={product.images[0]} alt={product.name} className="w-18 h-18 object-cover rounded-lg" />
                </td>
                <td className="p-4 text-lg font-medium max-w-xs truncate">{product.name}</td>
                <td className="p-4 text-gray-600">{product.seller}</td>
                <td className="p-4">
                  <img
                    src={assets.trash}
                    alt="Delete"
                    className="w-5 h-5 cursor-auto hover:opacity-70"
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
    </div>
  );
};

export default ViewAllProducts;
