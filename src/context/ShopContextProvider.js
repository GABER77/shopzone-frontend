import { ShopContext } from "./ShopContext";
import { products } from "../assets/products";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";

  const value = { products, currency, delivery_fee };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
