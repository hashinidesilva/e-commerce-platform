import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const response = await fetch("http://localhost:9000/categories");
  return response.json();
};
export const useCategories = () => {
  return useQuery(["categories"], fetchCategories);
};