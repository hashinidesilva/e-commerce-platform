import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CartContext } from "../store/cart-context.jsx";

const addCart = async (cart) => {
  const response = await axios.post("http://localhost:9003/carts", cart);
  return response.data;
};
export const useAddCart = () => {
  const cartCtx = useContext(CartContext);
  return useMutation({
    mutationFn: addCart,
    onSuccess: ({items}) => {
      cartCtx.addItem(items[0]);
    }
  });
};