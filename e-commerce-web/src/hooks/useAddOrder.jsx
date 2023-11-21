import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addOrder = async (item) => {
  const response = await axios.post('http://localhost:9001/orders', item);
  return response.data;
};
export const useAddOrder = (config) => {
  return useMutation({
    mutationFn: addOrder,
    ...config
  });
};