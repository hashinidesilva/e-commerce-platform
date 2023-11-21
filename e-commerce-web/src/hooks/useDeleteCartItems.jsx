import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteItems = async (cartId) => {
  const response = await axios.delete(`http://localhost:9003/carts/${cartId}/items`);
  return response.data;
};
export const useDeleteCartItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ([cartId]) => deleteItems(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['carts']});
    }
  });
};