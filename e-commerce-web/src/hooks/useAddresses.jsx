import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAddresses = async () => {
  const response = await axios.get("http://localhost:9004/users/1/addresses");
  return response.data;
};
export const useAddresses = () => {
  return useQuery(["addresses"], fetchAddresses);
};