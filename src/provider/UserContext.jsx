import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./authProvider";
import { getMyCart } from "../services/apiCart";

const UserContext = createContext();

export const useUserState = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [changedCart, setChangedCart] = useState(true);
  const [changedViewedProduct, setChangeViewedProduct] = useState(true);
  const [viewedProducts, setViewedProducts] = useState(
    JSON.parse(localStorage.getItem("viewedProducts")) || []
  );

  useEffect(() => {
    if (token && changedCart) {
      async function fetchMyCart() {
        try {
          const response = await getMyCart();
          const { data } = response;
          const { content } = data;
          console.log(content);
          setCart(content);
          setChangedCart(false);
        } catch {
          return [];
        }
      }
      fetchMyCart();
    }
  }, [token, changedCart]);

  const cartValue = useMemo(
    () => ({
      cart,
      setCart,
      setChangedCart,
      viewedProducts,
      setChangeViewedProduct,
    }),
    [cart, setCart, viewedProducts]
  );

  useEffect(() => {
    if (changedViewedProduct) {
      setViewedProducts(
        JSON.parse(localStorage.getItem("viewedProducts")) || []
      );
      setChangeViewedProduct(false);
    }
  }, [changedViewedProduct]);

  return (
    <UserContext.Provider value={cartValue}>{children}</UserContext.Provider>
  );
}
