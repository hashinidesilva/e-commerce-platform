import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addReview = async (rating) => {
  const response = await axios.post("http://localhost:9005/ratings", rating);
  return response.data;
};
export const useAddReview = (config) => {
  return useMutation({
    mutationFn: addReview,
    ...config
  });
};