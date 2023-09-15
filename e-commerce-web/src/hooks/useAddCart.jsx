import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddCart = () => {
  return useMutation(async (cart) => {
    const response = await axios.post("http://localhost:9003/carts", cart);
    return response.data;
  });
};