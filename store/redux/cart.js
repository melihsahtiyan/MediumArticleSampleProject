import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const cartSlice = createSlice({
  name: "cart",         // this should match the name of the reducer in store\redux\store.js
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      if (
        state.cartItems.find((item) => item.id === action.payload.product.id)
      ) {
        return Alert.alert("Failed", "Product already in cart", [
          {
            text: "OK",
          },
        ]);
      }
      state.cartItems.push(action.payload.product);
    },
    removeFromCart(state, action) {
      state.cartItems.splice(state.cartItems.indexOf(action.payload.id), 1);
    },
  },
});

export const addToCart = cartSlice.actions.addToCart;

export const removeFromCart = cartSlice.actions.removeFromCart;

export default cartSlice.reducer;
