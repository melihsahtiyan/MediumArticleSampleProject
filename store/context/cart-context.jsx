import { createContext, useState } from "react";
import { Alert } from "react-native";

export const CartContext = createContext({
  cartItems: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItemHandler = (item) => {
    const existingProduct = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingProduct) {
      Alert.alert("Failed", "Product already in cart", [
        {
          text: "OK",
        },
      ]);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, item]);
    }
  };

  const removeItemHandler = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const value = {
    cartItems: cartItems,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
