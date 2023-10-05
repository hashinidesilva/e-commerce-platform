import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteItem = async (cartId, itemId) => {
  const response = await axios.delete(`http://localhost:9003/carts/${cartId}/items/${itemId}`);
  return response.data;
};
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ([cartId, itemId]) => deleteItem(cartId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['carts']});
    }
  });
};