import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (newItem) => {
  },
  removeItem: (id) => {
  },
  changeQuantity: (id, quantity) => {
  },
  setInitialItems: (items) => {
  }
});