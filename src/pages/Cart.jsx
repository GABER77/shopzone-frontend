import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import Title from "../components/Title";
import { assets } from "../assets/getAssets";

const Cart = () => {
  const { currency, delivery_fee, tax_fee } = useContext(ShopContext);
  const { cart, loading, removeFromCart, clearCart, checkout } = useContext(CartContext);

  // Prepare cart items & subtotal
  let subtotal = 0;
  const cartItems = cart
    .filter(({ product, quantity }) => quantity > 0 && product)
    .map(({ product, size, quantity }) => {
      const itemTotal = product.price * quantity;
      subtotal += itemTotal;
      return { ...product, size, quantity, itemTotal };
    });

  // Calculate fees and total
  const taxAmount = subtotal * (parseFloat(tax_fee) / 100);
  const deliveryFee = parseFloat(delivery_fee);
  const total = subtotal + taxAmount + deliveryFee;

  // Clear cart with confirmation
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  // Remove single item handler
  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  return (
    <div>
      {/* Loading overlay */}
      {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center" />}

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">
          <Title text1="YOUR" text2="CART" />
        </h2>
        <button
          onClick={handleClearCart}
          disabled={loading || cartItems.length === 0}
          className="bg-red-500 text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-red-600 disabled:opacity-50"
          aria-label="Clear Cart"
        >
          Clear Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl font-medium text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            {[...cartItems].reverse().map((item, idx) => (
              <div key={idx} className="flex gap-6 border-b pb-6">
                {/* Wrap image and product info with Link to product page */}
                <Link to={`/product/${item._id}`} className="flex gap-6 flex-1 no-underline text-inherit">
                  <img src={item.images[0]} alt={item.name} className="w-45 h-45 object-cover rounded-2xl shadow-xl" />
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-md text-gray-600">{item.category}</p>
                    <p className="text-lg mt-1">Size: {item.size}</p>
                    <p className="text-md">Qty: {item.quantity}</p>
                    <p className="font-medium text-lg mt-6">Shipping</p>
                    <p className="text-md">Arrives by Fri, May 9</p>
                  </div>
                </Link>

                {/* Keep remove button outside the Link so clicking it doesn't navigate */}
                <div className="flex flex-col items-end">
                  <div className="font-medium text-xl text-right">
                    {currency}
                    {item.itemTotal.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id, item.size)}
                    disabled={loading}
                    aria-label={`Remove ${item.name} size ${item.size}`}
                    className="mt-4"
                  >
                    <img src={assets.trash} alt="Remove item" className="w-5 h-5 cursor-pointer hover:opacity-70" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full h-95 lg:w-1/3 border p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="flex justify-between text-md mb-2">
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-md mb-2">
              <span>Shipping</span>
              <span>
                {currency}
                {deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-md mb-2">
              <span>Estimated Tax</span>
              <span>
                {currency}
                {taxAmount.toFixed(2)}
              </span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-xl">
              <span>Total</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={checkout}
              disabled={loading}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-4xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              Checkout
            </button>
            <p className="mt-4 text-xs">
              By proceeding to checkout, you confirm that you have read, understand, and agree to ShopZone’s Terms of
              Use, Terms of Sale and Return Policy, and acknowledge ShopZone’s Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
