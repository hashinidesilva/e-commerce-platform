import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchRatings = async (params) => {
  const response = await axios.get("http://localhost:9005/ratings", {
    params: params
  });
  return response.data;
};
export const useRatings = (params) => {
  return useQuery(["ratings", params], () => fetchRatings(params));
};