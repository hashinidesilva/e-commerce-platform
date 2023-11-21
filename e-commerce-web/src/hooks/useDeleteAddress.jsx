import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteAddress = async (id) => {
  const response = await axios.delete(`http://localhost:9004/users/1/addresses/${id}`);
  return response.data;
};
export const useDeleteAddress = (config) => {
  return useMutation({
    mutationFn: ([addressId]) => deleteAddress(addressId),
    ...config
  });
};