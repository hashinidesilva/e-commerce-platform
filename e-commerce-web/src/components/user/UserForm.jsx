import { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useUpdateUser } from "../../hooks/useUpdateUser.jsx";
import { UserContext } from "../../store/user-context.jsx";

export const UserForm = ({user, handleClose, isOpen = false}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const userCtx = useContext(UserContext);
  const {mutate: userFunc} = useUpdateUser({
    onSuccess: (updatedUser) => {
      userCtx.updateUser(updatedUser);
      handleClose();
    }
  });

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    const newUser = {
      name: name,
      phoneNumber: +phoneNumber,
      email: email
    };
    userFunc({
      ...user,
      ...newUser
    });
  };

  useEffect(() => {
    setName(user?.name);
    setPhoneNumber(user?.phoneNumber);
    setEmail(user?.email);
  }, [user]);

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        Edit User Information
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
            multiline
            id="email"
            label="Email"
            value={email}
            onChange={onEmailChange}
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{backgroundColor: "#ffb300", color: "black"}} onClick={onSubmit}>
          Save changes
        </Button>
        <Button variant={'outlined'} sx={{borderColor: "#ffb300", color: "black"}} onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool
};