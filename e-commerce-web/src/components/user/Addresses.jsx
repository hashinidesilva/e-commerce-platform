import { useState } from "react";
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { AddressItem } from "./AddressItem.jsx";
import { AddressForm } from "./AddressForm.jsx";

const Address = ({address}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        border: 1,
        borderColor: "#e0e0e0",
        borderRadius: '0.3rem',
        padding: '1rem 1rem 1rem 0rem',
        marginY: 1
      }}
    >
      <Stack direction={"row"}>
        <Radio
          value={address?.id}
          name="addresses"
        />
        <AddressItem address={address}/>
      </Stack>
      <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                  onClick={() => setIsEdit(true)}>
        Edit
      </Typography>
      <AddressForm isOpen={isEdit} handleClose={() => setIsEdit(false)} address={address}/>
    </Stack>
  );
};
export const Addresses = ({isOpen, handleClose, addresses}) => {
  const [addNewAddress, setAddNewAddress] = useState(false);
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle sx={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        Shipping Address
        <CloseIcon onClick={handleClose} sx={{'&:hover': {cursor: 'grab'}}}/>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          name="addresses"
          onChange={(event) => console.log(event.target.value)}>
          {addresses.map((address) => (
            <Address address={address} key={address?.id}/>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={() => setAddNewAddress(true)}>
          Add new address
        </Button>
      </DialogActions>
      <AddressForm isOpen={addNewAddress} handleClose={() => setAddNewAddress(false)}/>
    </Dialog>
  );
};

Addresses.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  addresses: PropTypes.array
};

Address.propTypes = {
  address: PropTypes.object
};