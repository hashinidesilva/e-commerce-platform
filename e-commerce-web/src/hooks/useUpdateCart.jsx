import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCart = async (item) => {
  const response = await axios.patch(`http://localhost:9003/carts/${item.cartId}`, item);
  return response.data;
};
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['carts']});
    }
  });
};