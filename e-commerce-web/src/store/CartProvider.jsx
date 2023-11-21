import { useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./cart-context.jsx";

export const CartProvider = (props) => {
  const [cart, setCart] = useState({});

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const addItem = (newItem) => {
    const cartItems = cart?.items;
    const index = cartItems.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      const existingItems = [...cartItems];
      existingItems[index].quantity = newItem.quantity;
      setCart(prev => ({...prev, items: existingItems}));
    } else {
      setCart(prev => ({
        ...prev,
        items: [{id: newItem.id, productId: newItem.product.id, quantity: newItem.quantity}, ...prev.items]
      }));
    }
  };

  const changeQuantity = (id, quantity) => {
    const items = cart?.items;
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      const existingItems = [...items];
      existingItems[index].quantity = quantity;
      setCart(prev => ({...prev, items: existingItems}));
    }
  };

  const changeSelected = (id, selected) => {
    const items = cart?.items;
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      const existingItems = [...items];
      existingItems[index].selected = selected;
      setCart(prev => ({...prev, items: existingItems}));
    }
  };

  const removeItem = (id) => {
    const items = cart?.items;
    const index = items.findIndex(item => item.id === id);
    const existingItems = [...items];
    existingItems.splice(index, 1);
    setCart(prev => ({...prev, items: existingItems}));
  };

  const cartContext = {
    cart: cart,
    updateCart: updateCart,
    addItem: addItem,
    removeItem: removeItem,
    changeQuantity: changeQuantity,
    changeSelected: changeSelected
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