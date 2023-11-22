import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrder = async (id) => {
  const response = await axios.get(`http://localhost:9001/orders/${id}`);
  return response.data;
};
export const useOrder = (id) => {
  return useQuery(["order", id], () => fetchOrder(id));
};