import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; // Adjust path as needed

const Orders = () => {
  const { getMyOrders, myOrders, loading, currency } = useContext(ShopContext);

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-[spin_0.3s_linear_infinite]"></div>
        </div>
      ) : myOrders.length === 0 ? (
        <p className="text-center py-10 text-lg text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-8 mt-8 px-4 sm:px-6 lg:px-8">
          {myOrders
            .slice()
            .reverse()
            .map((order) => (
              <div key={order._id} className="border rounded-2xl p-6 shadow-md space-y-6">
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm">
                      Status: <span className="capitalize">{order.status}</span>
                    </p>
                  </div>
                  <div className="text-right font-semibold text-lg">
                    Total: {currency}
                    {order.amount.toFixed(2)}
                  </div>
                </div>

                {/* Product List */}
                <div className="space-y-6">
                  {order.products.map((item, i) => (
                    <div key={i} className="flex gap-6 border-b pb-4">
                      <Link to={`/product/${item.product._id}`} className="flex gap-6 flex-1 no-underline text-inherit">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-32 h-32 object-cover rounded-2xl shadow-xl"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{item.product.name}</p>
                          <p className="text-md text-gray-600">Size: {item.size}</p>
                          <p className="text-md text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-md mt-1">
                            Price: {currency}
                            {item.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Shipping Info */}
                <div className="text-sm text-gray-600 pt-4">
                  <p className="font-medium text-gray-800">Shipping to:</p>
                  <p>{order.shippingDetails.name}</p>
                  <p>{order.shippingDetails.country}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Orders;
