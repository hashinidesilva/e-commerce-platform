import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCart = async () => {
  const response = await axios.get("http://localhost:9003/carts");
  return response.data;
};
export const useCart = () => {
  return useQuery(["carts"], fetchCart);
};