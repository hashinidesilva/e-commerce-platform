import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteItem = async (id) => {
  const response = await axios.delete(`http://localhost:9003/carts/${id}`);
  return response.data;
};
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['carts']});
    }
  });
};