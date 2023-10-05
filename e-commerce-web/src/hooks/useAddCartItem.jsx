import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addCart = async (item) => {
  const response = await axios.post(`http://localhost:9003/carts/${item.cartId}/items`, item);
  return response.data;
};
export const useAddCartItem = (config) => {
  return useMutation({
    mutationFn: addCart,
    ...config
  });
};