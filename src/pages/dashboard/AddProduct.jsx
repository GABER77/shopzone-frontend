import React from "react";

const AddProduct = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h2>
      <form className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Product Name */}
        <input type="text" placeholder="Product Name" className="w-full p-3 border border-gray-300 rounded-lg" />

        {/* Product Price */}
        <input type="number" placeholder="Price" className="w-full p-3 border border-gray-300 rounded-lg" />

        {/* Product Description */}
        <textarea placeholder="Description" className="w-full p-3 border border-gray-300 rounded-lg"></textarea>

        {/* Product Category */}
        <select className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="men">Men's Shoes</option>
          <option value="women">Women's Shoes</option>
          <option value="basketball">Basketball Shoes</option>
          <option value="running">Running Shoes</option>
        </select>

        {/* Product Sizes */}
        <div>
          <p className="font-semibold">Sizes:</p>
          <div className="flex gap-4 mt-2">
            {["6", "7", "8", "9", "10", "11", "12"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input type="checkbox" value={size} className="w-5 h-5" />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Upload Images */}
        <div className="space-y-2">
          <p className="font-semibold">Upload 3 Images:</p>
          {[0, 1, 2].map((i) => (
            <input key={i} type="file" accept="image/*" className="block w-full border p-2 rounded" />
          ))}
        </div>

        {/* On Sale Toggle */}
        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" className="w-5 h-5" />
          Is this product on sale?
        </label>

        {/* Submit Button */}
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
