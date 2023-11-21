import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  const response = await axios.get("http://localhost:9001/orders");
  return response.data;
};
export const useOrders = () => {
  return useQuery(["orders"], fetchOrders);
};