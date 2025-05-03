import { ShopContext } from "./ShopContext";
import products from "../assets/products";
import { useState } from "react";
import { toast } from "react-toastify";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";
  const tax_fee = "5%";
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});

  const addToCart = (productId, ProductSize) => {
    if (!ProductSize) {
      toast.error("Please select a size", {
        position: "top-left",
      });
      return;
    }

    let cartClone = structuredClone(cart);

    if (cartClone[productId]) {
      if (cartClone[productId][ProductSize]) {
        cartClone[productId][ProductSize] += 1;
      } else {
        cartClone[productId][ProductSize] = 1;
      }
    } else {
      cartClone[productId] = {};
      cartClone[productId][ProductSize] = 1;
    }
    setCart(cartClone);
  };

  const getCartCount = () => {
    let totalCount = 0;

    Object.values(cart).forEach((sizes) => {
      Object.values(sizes).forEach((quantity) => {
        if (typeof quantity === "number" && quantity > 0) {
          totalCount += quantity;
        }
      });
    });

    return totalCount;
  };

  const value = { products, currency, delivery_fee, tax_fee, search, setSearch, cart, addToCart, getCartCount };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
