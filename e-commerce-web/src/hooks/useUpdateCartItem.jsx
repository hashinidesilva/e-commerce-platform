import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateItem = async (item) => {
  const response = await axios.put(`http://localhost:9003/carts/${item.id}`, item);
  return response.data;
};
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['carts']});
    }
  });
};