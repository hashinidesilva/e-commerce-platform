import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { AddressContext } from "../../store/address-context.jsx";
import { AddressItem } from "../user/AddressItem.jsx";
import { AddressForm } from "../user/AddressForm.jsx";

const AddressCard = ({address}) => {
  const [editAddress, setEditAddress] = useState(false);
  return (
    <Card sx={{minWidth: 350, minHeight: 150, p: '0.5rem'}}>
      <CardContent>
        <Stack direction={"row"}
               sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
          <Stack spacing={1}>
            <AddressItem key={address.id} address={address}/>
            {address.isDefault && <Chip label="Default Delivery Address" size="small"/>}
          </Stack>
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => setEditAddress(true)}>
            Edit
          </Typography>
        </Stack>
      </CardContent>
      {editAddress &&
        <AddressForm
          address={address}
          isOpen={editAddress}
          handleClose={() => setEditAddress(false)}
        />
      }
    </Card>
  );
};

export const AddressesPage = () => {
  const addressCtx = useContext(AddressContext);
  const [addNewAddress, setAddNewAddress] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9004/users/1/addresses").then((response) => {
      const addresses = response.data;
      addressCtx.changeAddressList(addresses);
    });
  }, []);

  const addresses = addressCtx.addresses;
  return (
    <Box width={'100%'} sx={{display: 'flex', flexWrap: 'wrap'}}>
      <Stack direction={"column"}
             sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
        <Typography
          sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
          Address Book
        </Typography>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={() => setAddNewAddress(true)}>
          Add new address
        </Button>
      </Stack>
      <Grid container spacing={2}
            sx={{display: 'flex', justifyContent: "space-between", marginTop: '0.1rem'}}>
        {addresses.map(address => (
          <Grid item key={address.id}>
            <AddressCard address={address}/>
          </Grid>
        ))}
      </Grid>
      {addNewAddress && (
        <AddressForm
          isOpen={addNewAddress}
          handleClose={() => setAddNewAddress(false)}
        />
      )}
    </Box>
  );
};

AddressCard.propTypes = {
  address: PropTypes.object
};