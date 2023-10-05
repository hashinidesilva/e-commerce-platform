import { createContext } from "react";

export const CartContext = createContext({
  cart: {},
  updateCart: (updatedCart) => {
  },
  addItem: (newItem) => {
  },
  removeItem: (id) => {
  },
  changeQuantity: (id, quantity) => {
  },
});