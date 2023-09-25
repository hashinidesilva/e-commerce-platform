import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const AddressItem = ({address}) => {
  return (
    <>
      <Stack direction={"row"} spacing={2}>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>{address?.name}</Typography>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>{address?.phoneNumber}</Typography>
      </Stack>
      <Typography variant="caption" gutterBottom>{address?.address}</Typography>
      <Stack direction={"row"} spacing={0.5}>
        <Typography variant="caption" gutterBottom>{address?.province},</Typography>
        <Typography variant="caption" gutterBottom>{address?.city},</Typography>
        <Typography variant="caption" gutterBottom>{address?.postalCode}</Typography>
      </Stack>
    </>
  );
};

AddressItem.propTypes = {
  address: PropTypes.object
};