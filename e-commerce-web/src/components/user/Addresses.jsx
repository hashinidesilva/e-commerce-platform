import { useContext } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
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
import { AddressContext } from "../../store/address-context.jsx";
import { useUpdateAddress } from "../../hooks/useUpdateAddress.jsx";

const Address = ({address, isChecked, onEditAddress, onSetDefault}) => {
  const isDefault = address?.isDefault ?? false;

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        border: 1,
        borderColor: "#e0e0e0",
        borderRadius: '0.3rem',
        padding: '1rem 1rem 1rem 0.5rem',
        marginY: 1
      }}
    >
      <Stack direction={"row"} spacing={1}>
        <Radio
          value={address?.id}
          name="addresses"
          checked={isChecked}
        />
        <Stack direction={"row"} spacing={1}>
          <AddressItem address={address}/>
          {isDefault && <Chip label="Default" size="small" sx={{flexGrow: 2.5}}/>}
        </Stack>
      </Stack>
      <Stack alignItems={"flex-end"}>
        <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                    onClick={() => onEditAddress(address)}>
          Edit
        </Typography>
        {!isDefault && (
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => onSetDefault({...address, isDefault: true})}>
            Set as default
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
export const Addresses = ({isOpen, handleClose, onAddAddress, onEditAddress}) => {
  const addressCtx = useContext(AddressContext);
  const {mutate: updateFunc} = useUpdateAddress({
    onSuccess: (updatedAddress) => {
      addressCtx.updateAddress(updatedAddress);
    }
  });

  const addresses = addressCtx.addresses;

  const onAddressChange = (event) => {
    const newAddress = addresses.find((address) => address.id === +event.target.value);
    addressCtx.changeSelectedAddress(newAddress);
  };

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        Shipping Address
        <CloseIcon onClick={handleClose} sx={{'&:hover': {cursor: 'grab'}}}/>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          name="addresses"
          onChange={onAddressChange}>
          {addresses?.map((address) => (
            <Address
              key={address?.id}
              address={address}
              isChecked={address?.id === addressCtx.selectedAddress?.id}
              // selectedAddress={selectedAddress}
              onSetDefault={updateFunc}
              onEditAddress={onEditAddress}/>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={onAddAddress}>
          Add new address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Addresses.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  onAddAddress: PropTypes.func,
  onEditAddress: PropTypes.func
};

Address.propTypes = {
  address: PropTypes.object,
  isChecked: PropTypes.bool,
  onEditAddress: PropTypes.func,
  onSetDefault: PropTypes.func
};