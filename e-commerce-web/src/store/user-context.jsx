import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  updateUser: (user) => {
  }
});