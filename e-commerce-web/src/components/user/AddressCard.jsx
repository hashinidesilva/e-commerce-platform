import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Stack, Typography } from "@mui/material";
import { AddressItem } from "./AddressItem.jsx";
import { Addresses } from "./Addresses.jsx";
import { AddressContext } from "../../store/address-context.jsx";
import { AddressForm } from "./AddressForm.jsx";

export const AddressCard = () => {
  const addressCtx = useContext(AddressContext);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editAddress, setEditAddress] = useState({});

  useEffect(() => {
    axios.get("http://localhost:9004/users/1/addresses").then((response) => {
      const addresses = response.data;
      const defaultAddress = addresses?.find((address) => address.isDefault);
      addressCtx.changeSelectedAddress(defaultAddress);
      addressCtx.changeAddressList(addresses);
    });
  }, []);

  const addresses = addressCtx.addresses;

  const onAddAddress = () => {
    setAddNewAddress(true);
    setShowAddressList(false);
  };

  const onEditAddress = (address) => {
    setEditAddress(address);
    setIsEdit(true);
    setShowAddressList(false);
  };

  return (
    <Card sx={{p: 3}}>
      <Typography variant="h5" gutterBottom fontWeight={600}>Shipping Address</Typography>
      {addresses?.length === 0 ? (
        <Typography sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}>
          Add a new address
        </Typography>
      ) : (
        <Stack direction={"row"} sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
          <AddressItem address={addressCtx.selectedAddress ?? addresses[0]}/>
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => setShowAddressList(true)}>
            Change
          </Typography>
        </Stack>
      )}
      {showAddressList &&
        <Addresses
          onAddAddress={onAddAddress}
          isOpen={showAddressList}
          onEditAddress={onEditAddress}
          handleClose={() => setShowAddressList(false)}
        />
      }
      {addNewAddress &&
        <AddressForm
          isOpen={addNewAddress}
          handleClose={() => {
            setAddNewAddress(false);
            setShowAddressList(true);
          }}
        />
      }
      {isEdit &&
        <AddressForm
          address={editAddress}
          isOpen={isEdit}
          handleClose={() => {
            setShowAddressList(true);
            setIsEdit(false);
          }}
        />
      }
    </Card>
  );
};