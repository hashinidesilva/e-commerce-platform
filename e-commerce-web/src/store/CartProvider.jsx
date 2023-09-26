import { useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./cart-context.jsx";

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    const index = items.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      const existingItems = [...items];
      existingItems[index].quantity = newItem.quantity;
      setItems(existingItems);
    } else {
      setItems((prev) => [{id: newItem.id, productId: newItem.product.id, quantity: newItem.quantity}, ...prev]);
    }
  };

  const changeQuantity = (id, quantity) => {
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      const existingItems = [...items];
      existingItems[index].quantity = quantity;
      setItems(existingItems);
    }
  };

  const removeItem = (id) => {
    const index = items.findIndex(item => item.id === id);
    const existingItems = [...items];
    existingItems.splice(index, 1);
    setItems(existingItems);
  };

  const setInitialItems = (items) => {
    setItems(items);
  };

  const cartContext = {
    items: items,
    addItem: addItem,
    removeItem: removeItem,
    changeQuantity: changeQuantity,
    setInitialItems: setInitialItems
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any
};