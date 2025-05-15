import React from "react";

const AddProduct = () => {
  const sizes = [];
  for (let i = 7; i <= 13; i += 0.5) {
    sizes.push(i % 1 === 0 ? i.toString() : i.toFixed(1));
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h2>

      <form className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Image Upload Boxes */}
        <div>
          <p className="font-semibold text-xl mb-3">Product Images:</p>
          <div className="grid grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <label
                key={i}
                className="w-50 aspect-square border-2 border-gray-700 rounded-xl flex items-center justify-center text-sm text-gray-700 cursor-pointer"
              >
                <input type="file" accept="image/*" className="hidden" />
                Click to upload
              </label>
            ))}
          </div>
        </div>

        <input type="text" placeholder="Product Name" className="w-full p-3 border-2 rounded-lg" />
        <input type="number" placeholder="Price" className="w-full p-3 border-2 rounded-lg" />
        <textarea placeholder="Description" className="w-full p-3 border-2 rounded-lg" />

        {/* Sizes */}
        <div>
          <p className="font-semibold">Sizes:</p>
          <div className="flex flex-wrap gap-4 mt-3">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input type="checkbox" value={size} className="w-5 h-5 accent-blue-500 cursor-pointer" />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <select className="w-full p-3 border rounded-lg mt-2 cursor-pointer">
          <option value="men">Men's Shoes</option>
          <option value="women">Women's Shoes</option>
          <option value="basketball">Basketball Shoes</option>
          <option value="running">Running Shoes</option>
        </select>

        {/* On Sale */}
        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" className="w-5 h-5 accent-blue-500" />
          Is this product on sale?
        </label>

        {/* Submit Button */}
        <button className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
