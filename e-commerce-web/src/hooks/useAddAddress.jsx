import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addAddress = async (address) => {
  const response = await axios.post("http://localhost:9004/users/1/addresses", address);
  return response.data;
};
export const useAddAddress = (config) => {
  return useMutation({
    mutationFn: addAddress,
    ...config
  });
};