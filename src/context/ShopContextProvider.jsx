import { ShopContext } from "./ShopContext";
import products from "../assets/products";
import { useState } from "react";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = { products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
