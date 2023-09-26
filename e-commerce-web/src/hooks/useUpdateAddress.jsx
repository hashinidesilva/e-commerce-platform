import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const updateAddress = async (address) => {
  const response = await axios.put(`http://localhost:9004/users/1/addresses/${address.id}`, address);
  return response.data;
};
export const useUpdateAddress = (config) => {
  return useMutation({
    mutationFn: updateAddress,
    ...config
  });
};