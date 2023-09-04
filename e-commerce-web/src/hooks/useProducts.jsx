import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (params) => {
  const response = await axios.get("http://localhost:9000/products", {
    params: params
  });
  return response.data;
};
export const useProducts = (params) => {
  return useQuery(["products", params], () => fetchProducts(params));
};