import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export const Discard = ({title, body, isOpen, handleClose, keep}) => {
  return (
    <Dialog open={isOpen} maxWidth="md">
      <DialogTitle sx={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        {title}
        <CloseIcon onClick={handleClose} sx={{'&:hover': {cursor: 'grab'}}}/>
      </DialogTitle>
      <DialogContent>
        {body}
      </DialogContent>
      <DialogActions>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={keep}>
          Keep Editing
        </Button>
        <Button variant={'outlined'} sx={{borderColor: "#ffb300", color: "black"}} onClick={handleClose}>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Discard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  keep: PropTypes.func
};