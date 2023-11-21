import { createContext } from "react";

export const AddressContext = createContext({
  selectedAddress: {},
  addresses: [],
  addAddress: (address) => {
  },
  updateAddress: (address) => {
  },
  changeSelectedAddress: (address) => {
  },
  changeAddressList: (addresses) => {
  },
  deleteAddress: (id) => {
  }
});