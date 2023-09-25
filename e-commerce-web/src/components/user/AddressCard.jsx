import { useState } from "react";
import { Card, Stack, Typography } from "@mui/material";
import { AddressItem } from "./AddressItem.jsx";
import { Addresses } from "./Addresses.jsx";

const addresses = [{
  id: 1,
  name: "Test name",
  address: "Test",
  city: "Test city",
  province: "Central",
  phoneNumber: '0111111',
  postalCode: "1111"
},
  {
    id: 2,
    name: "Test name1",
    address: "Test1",
    city: "Test city",
    province: "NorthWestern",
    phoneNumber: '0111111',
    postalCode: "1111"
  }];

// const addresses = [];
export const AddressCard = () => {
  const [showAddressList, setShowAddressList] = useState(false);
  const address = addresses[0];
  return (
    <Card sx={{p: 3}}>
      <Typography variant="h5" gutterBottom fontWeight={600}>Shipping Address</Typography>
      {addresses.length === 0 ? (
        <Typography sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}>
          Add a new address
        </Typography>
      ) : (
        <Stack direction={"row"} sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
          <AddressItem address={address}/>
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => setShowAddressList(true)}>
            Change
          </Typography>
        </Stack>
      )}
      <Addresses isOpen={showAddressList} handleClose={() => setShowAddressList(false)} addresses={addresses}/>
    </Card>
  );
};