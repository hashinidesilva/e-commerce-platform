import { useState } from "react";
import PropTypes from "prop-types";
import { AddressContext } from "./address-context.jsx";

export const AddressProvider = (props) => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [addresses, setAddresses] = useState([]);

  const addAddress = (newAddress) => {
    if (newAddress.isDefault) {
      const updatedList = addresses.map((address) => {
        address.isDefault = false;
        return address;
      });
      setAddresses([...updatedList, newAddress]);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
  };

  const updateAddress = (updatedAddress) => {
    const index = addresses.findIndex(item => item.id === updatedAddress.id);
    if (index > -1) {
      let existingAddresses = [...addresses];
      if (updatedAddress.isDefault) {
        existingAddresses = addresses.map((address) => {
          address.isDefault = false;
          return address;
        });
      }
      existingAddresses[index] = updatedAddress;
      setAddresses(existingAddresses);
      if (selectedAddress.id === updatedAddress.id) {
        setSelectedAddress(updatedAddress);
      }
    }
  };
  const changeAddress = (address) => {
    setSelectedAddress(address);
  };

  const changeAddressList = (addresses) => {
    setAddresses(addresses);
  };

  const deleteAddress = (id) => {
    const index = addresses.findIndex(item => item.id === id);
    const existingAddresses = [...addresses];
    existingAddresses.splice(index, 1);
    setAddresses(existingAddresses);
  };

  const addressContext = {
    selectedAddress: selectedAddress,
    addresses: addresses,
    addAddress: addAddress,
    updateAddress: updateAddress,
    changeSelectedAddress: changeAddress,
    changeAddressList: changeAddressList,
    deleteAddress: deleteAddress
  };

  return (
    <AddressContext.Provider value={addressContext}>
      {props.children}
    </AddressContext.Provider>
  );
};

AddressProvider.propTypes = {
  children: PropTypes.any
};