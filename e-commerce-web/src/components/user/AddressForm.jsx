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
import PropTypes from "prop-types";

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
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        {address ? "Edit Shipping Address" : "Add a new address"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            id="full-name"
            label="Full name"
            value={address?.name}
          />
          <TextField
            fullWidth
            required
            type="number"
            id="phone-number"
            label="Phone number"
            value={address?.phoneNumber}
          />
          <TextField
            fullWidth
            required
            multiline
            id="address"
            label="Address"
            value={address?.address}
          />
          <Stack direction="row" spacing={4}>
            <FormControl sx={{flexGrow: 2.5}} required>
              <InputLabel id="province">Province</InputLabel>
              <Select
                label="Province"
                value={address?.province}
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
              value={address?.city}
            />
            <TextField
              required
              id="postal-code"
              type="number"
              label="Postal Code"
              sx={{flexGrow: 1}}
              value={address?.postalCode}
            />
          </Stack>
          <Typography variant="body2">
            <Checkbox/>
            Set as default shipping address
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}}>
          Confirm
        </Button>
        <Button variant={'outlined'} sx={{borderColor: "#ffb300", color: "black"}} onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddressForm.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  address: PropTypes.object
};