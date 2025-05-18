import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { addProduct, loading } = useContext(ShopContext);

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("Men's Shoes");
  const [onSale, setOnSale] = useState(false);

  const sizeList = [];
  for (let i = 7; i <= 13; i += 0.5) {
    sizeList.push(i % 1 === 0 ? i.toString() : i.toFixed(1));
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0 || !images[0]) {
      toast.error("Please upload at least one image.", { position: "top-left", autoClose: 3000 });
      return;
    }

    try {
      const productData = {
        name: productName,
        price,
        description,
        category,
        onSale,
        sizes,
        images,
      };
      await addProduct(productData);
      toast.success("Product added successfully!", { position: "top-left", autoClose: 3000 });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product", { position: "top-left", autoClose: 3000 });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Images */}
        <div>
          <p className="font-semibold text-xl mb-3">Product Images:</p>
          <div className="w-full max-w-6xl mx-auto px-1 py-1 grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <label
                key={i}
                className="w-full aspect-square border-2 border-gray-700 rounded-xl flex items-center justify-center text-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
              >
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, i)} />
                {images[i] ? images[i].name : "Click to upload"}
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border-2 rounded-lg"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border-2 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Sizes */}
        <div>
          <p className="font-semibold">Sizes:</p>
          <div className="flex flex-wrap gap-4 mt-3">
            {sizeList.map((size) => (
              <label key={size} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  value={size}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                  checked={sizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <select
          className="w-full p-3 border rounded-lg mt-2 cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="men">Men's Shoes</option>
          <option value="women">Women's Shoes</option>
          <option value="basketball">Basketball Shoes</option>
          <option value="running">Running Shoes</option>
        </select>

        {/* On Sale */}
        <label className="flex items-center gap-2 mt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-500 cursor-pointer"
            checked={onSale}
            onChange={() => setOnSale(!onSale)}
          />
          Is this product on sale?
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Loading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
