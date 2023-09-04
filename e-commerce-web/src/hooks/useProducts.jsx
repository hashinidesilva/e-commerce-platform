import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (params) => {
  const response = await fetch("http://localhost:9000/products?" + new URLSearchParams(params));
  return response.json();
};
export const useProducts = (params) => {
  return useQuery(["products", params], fetchProducts);
};