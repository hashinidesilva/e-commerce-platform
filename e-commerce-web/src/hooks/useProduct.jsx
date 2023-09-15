import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (id) => {
  const response = await axios.get(`http://localhost:9000/products/${id}`);
  return response.data;
};
export const useProduct = (id) => {
  return useQuery(["product", id], () => fetchProduct(id));
};