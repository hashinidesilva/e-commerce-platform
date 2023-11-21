import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const updateUser = async (user) => {
  const response = await axios.post("http://localhost:9004/users", user);
  return response.data;
};
export const useUpdateUser = (config) => {
  return useMutation({
    mutationFn: updateUser,
    ...config
  });
};