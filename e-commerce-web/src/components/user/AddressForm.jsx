import { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useAddAddress } from "../../hooks/useAddAddress.jsx";
import { AddressContext } from "../../store/address-context.jsx";
import { useUpdateAddress } from "../../hooks/useUpdateAddress.jsx";
import { useDeleteAddress } from "../../hooks/useDeleteAddress.jsx";
import { Discard } from "../common/Discard.jsx";

const PROVINCES = [
  {label: "Central", value: "Central"},
  {label: "Eastern", value: "Eastern"},
  {label: "North Central", value: "NorthCentral"},
  {label: "North Western", value: "NorthWestern"},
  {label: "Nothern", value: "Nothern"},
  {label: "Sabaragamuwa", value: "Sabaragamuwa"},
  {label: "Southern", value: "Southern"},
  {label: "Uva", value: "Uva"},
  {label: "Western", value: "Western"},
];

export const AddressForm = ({isOpen, handleClose, address = undefined}) => {

  const addressCtx = useContext(AddressContext);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [province, setProvince] = useState(PROVINCES[0].value);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);

  const {mutate: addFunc} = useAddAddress({
    onSuccess: (newAddress) => {
      addressCtx.addAddress(newAddress);
      handleClose();
    }
  });
  const {mutate: updateFunc} = useUpdateAddress({
    onSuccess: (updatedAddress) => {
      addressCtx.updateAddress(updatedAddress);
      handleClose();
    }
  });
  const {mutate: deleteFunc} = useDeleteAddress({
    onSuccess: () => {
      addressCtx.deleteAddress(address?.id);
      handleClose();
    }
  });

  useEffect(() => {
    if (address) {
      setName(address.name);
      setPhoneNumber(address.phoneNumber);
      setStreetAddress(address.address);
      setProvince(address.province);
      setCity(address.city);
      setPostalCode(address.postalCode);
      setIsDefault(address.isDefault);
    }

  }, [address]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const onProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const onCityChange = (event) => {
    setCity(event.target.value);
  };

  const onStreetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const onPostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const onDelete = () => {
    deleteFunc([address?.id]);
  };

  const onSubmit = () => {
    const newAddress = {
      name: name,
      phoneNumber: +phoneNumber,
      address: streetAddress,
      province: province,
      city: city,
      postalCode: +postalCode,
      isDefault: isDefault
    };
    if (address) {
      updateFunc({
        ...address,
        ...newAddress
      });
    } else {
      addFunc(newAddress);
    }
  };
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        {address ? "Edit Shipping Address" : "Add a new address"}
        <CloseIcon onClick={handleClose} sx={{'&:hover': {cursor: 'grab'}}}/>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            id="full-name"
            label="Full name"
            value={name}
            onChange={onNameChange}
          />
          <TextField
            fullWidth
            required
            type="number"
            id="phone-number"
            label="Phone number"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
          />
          <TextField
            fullWidth
            required
            multiline
            id="address"
            label="Address"
            value={streetAddress}
            onChange={onStreetAddressChange}
          />
          <Stack direction="row" spacing={4}>
            <FormControl sx={{flexGrow: 2.5}} required>
              <InputLabel id="province">Province</InputLabel>
              <Select
                label="Province"
                value={province}
                onChange={onProvinceChange}
              >
                {PROVINCES.map((province) => (
                  <MenuItem key={province.value} value={province.value}>{province.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="city"
              label="City"
              sx={{flexGrow: 2}}
              value={city}
              onChange={onCityChange}
            />
            <TextField
              required
              id="postal-code"
              type="number"
              label="Postal Code"
              sx={{flexGrow: 1}}
              value={postalCode}
              onChange={onPostalCodeChange}
            />
          </Stack>
          <Typography variant="body2">
            <Checkbox checked={isDefault} onChange={(event) => setIsDefault(event.target.checked)}/>
            Set as default shipping address
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{justifyContent: `${(address && !address.isDefault) ? "space-between" : "flex-end"}`, marginX: '1rem'}}>
        {(address && !address.isDefault) && (
          <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={onDelete}>
            Delete Address
          </Button>
        )}
        <Stack direction={"row"} spacing={2}>
          <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={onSubmit}>
            Confirm
          </Button>
          <Button variant={'outlined'} sx={{borderColor: "#ffb300", color: "black"}}
                  onClick={() => setIsDiscardOpen(true)}>
            Cancel
          </Button>
        </Stack>
      </DialogActions>
      {isDiscardOpen && (
        <Discard title={"Discard your address card?"}
                 body={"You haven’t finished your address card yet. Are you sure you want to leave and discard your inputs?"}
                 handleClose={handleClose}
                 keep={() => setIsDiscardOpen(false)}
                 isOpen={isDiscardOpen}
        />
      )}
    </Dialog>
  );
};

AddressForm.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  address: PropTypes.object
};