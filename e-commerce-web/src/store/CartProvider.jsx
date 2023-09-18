import { CartContext } from "./cart-context.jsx";
import PropTypes from "prop-types";
import { useState } from "react";

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    const index = items.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      items[index].quantity = items[index].quantity + newItem.quantity;
      setItems(items);
    } else {
      setItems((prev) => [{id: newItem.id, productId: newItem.product.id, quantity: newItem.quantity}, ...prev]);
    }
  };

  // const addItems = (items) = {
  //   items.map(newItem => addItem(newItem))
  // };
  const changeQuantity = (id, quantity) => {
    const index = items.findIndex(item => item.id === id);
    if (index) {
      items[index].quantity = quantity;
      setItems(items);
    }
  };

  const removeItem = (id) => {
    const index = items.findIndex(item => item.id === id);
    const updatedList = items.splice(index, 1);
    setItems(updatedList);
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