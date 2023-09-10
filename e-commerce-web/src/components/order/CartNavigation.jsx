import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

export const CartNavigation = ({isOpen, handleClose, itemSize}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        {itemSize} new item(s) have been added to your cart
      </DialogTitle>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleClose} sx={{borderColor: "#ffb300", color: "black"}}>
          Continue shopping
        </Button>
        <Button variant={'outlined'} onClick={handleClose} sx={{borderColor: "#ffb300", color: "black"}}>
          Go to cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CartNavigation.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  itemSize: PropTypes.number
};