import { createContext, useContext, useState, useEffect } from "react";
import {authFetch, getAccessToken} from "../utils/auth";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  //Fetch entire cart from the backend
  const fetchCart = async () => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);
      const data = await res.json();
      setCartItems(data.items || []);
      setTotal(data.total, 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  //Add product to Cart
  const addToCart = async (product) => {
    try {
      await authFetch(`${BASEURL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product.id }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to data", error);
    }
  };

  //removing items from the cart
  const removeFromCart = async (item_id) => {
    try {
      await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: item_id }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing from the cart:", error);
    }
  };

  //updating the cart
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    await authFetch(`${BASEURL}/api/cart/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId, quantity }),
    });
    fetchCart();
    try {
    } catch (error) {
      console.error("Error to update the quantity", error);
    }
  };

  const clearCart = ()=>{
    setCartItems([]);
    setTotal(0);

  }

  return (
    <CartContext.Provider
      value={{ cartItems, total, addToCart, removeFromCart, updateQuantity , clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
