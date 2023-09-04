import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async () => {
  const response = await axios.get("http://localhost:9000/categories");
  return response.data;
};
export const useCategories = () => {
  return useQuery(["categories"], fetchCategories);
};