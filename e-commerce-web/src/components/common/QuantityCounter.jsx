import { IconButton, InputAdornment, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

export const QuantityCounter = ({quantity, setQuantity, width = '20%'}) => {
  const handleChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setQuantity(event.target.value);
    }
  };
  return (
    <TextField
      id="qunatity"
      type="text"
      size="small"
      value={quantity}
      onChange={handleChange}
      sx={{width: width}}
      inputProps={{style: {textAlign: 'center'}}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              color="inherit"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
              sx={{paddingX: 0, backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
            >
              <RemoveIcon/>
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setQuantity(quantity + 1)}
              sx={{paddingX: 0, borderRadius: 0, backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
            >
              <AddIcon/>
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

QuantityCounter.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  width: PropTypes.string
};