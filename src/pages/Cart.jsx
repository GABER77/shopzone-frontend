import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/getAssets";

const Cart = () => {
  const { products, cart, currency, delivery_fee, tax_fee } = useContext(ShopContext);

  const cartItems = [];
  let subtotal = 0;

  for (const [productId, sizes] of Object.entries(cart)) {
    for (const [size, quantity] of Object.entries(sizes)) {
      if (quantity > 0) {
        const productData = products.find((product) => product._id === productId);
        if (productData) {
          const itemTotal = productData.price * quantity;
          subtotal += itemTotal;
          cartItems.push({
            ...productData,
            size,
            quantity,
            itemTotal,
          });
        }
      }
    }
  }

  // Calculate the tax based on the subtotal
  const taxAmount = subtotal * (parseFloat(tax_fee) / 100);

  // Add the delivery fee
  const deliveryFee = parseFloat(delivery_fee);

  // Final Total Calculation: subtotal + tax + delivery fee
  const total = subtotal + taxAmount + deliveryFee;

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Cart Items Section */}
        <div className="flex-1 space-y-8">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-6 border-b pb-6">
              <div>
                <img src={item.images[0]} alt={item.name} className="w-45 h-45 object-cover rounded-2xl shadow-xl" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-md text-gray-600">{item.category}</p>
                <p className="text-lg mt-1">Size: {item.size}</p>
                <p className="text-md">Qty: {item.quantity}</p>
                <p className="font-medium text-lg mt-6">Shipping</p>
                <p className="text-md">Arrives by Fri, May 9</p>
              </div>

              {/* Price + Trash Icon */}
              <div className="flex flex-col items-end">
                <div className="font-medium text-xl text-right">
                  {currency}
                  {item.itemTotal.toFixed(2)}
                </div>
                <img src={assets.trash} alt="" className="w-5 h-5 mt-17 cursor-pointer hover:opacity-70" />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full h-95 lg:w-1/3 border p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
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
          <button className="mt-4 w-full bg-blue-500 text-white cursor-pointer py-3 rounded-4xl hover:opacity-90">
            Checkout
          </button>
          <p className="mt-4 text-xs">
            By proceeding to checkout, you confirm that you have read, understand, and agree to ShopZone’s Terms of Use,
            Terms of Sale and Return Policy, and acknowledge ShopZone’s Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
