import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async (id) => {
  const response = await axios.get(`http://localhost:9004/users/${id}`);
  console.log("EEE",response)
  return response.data;
};
export const useUser = (id) => {
  return useQuery(["user", id], () => fetchUser(id));
};