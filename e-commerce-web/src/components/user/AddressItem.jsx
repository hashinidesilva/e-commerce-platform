import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const AddressItem = ({address}) => {
  return (
    <div>
      <Stack spacing={1}>
        <Stack direction={"row"} spacing={2} sx={{alignItems: 'center'}}>
          <Typography sx={{fontSize: 15}} fontWeight={600}>{address?.name}</Typography>
          <Typography variant="subtitle2" fontWeight={400}>{address?.phoneNumber}</Typography>
        </Stack>
        <Typography variant="body2">{address?.address}</Typography>
      </Stack>
      <Stack direction={"row"} spacing={0.5} sx={{alignItems: 'center'}}>
        <Typography variant="body2">{address?.province},</Typography>
        <Typography variant="body2">{address?.city},</Typography>
        <Typography variant="body2">{address?.postalCode}</Typography>
      </Stack>
    </div>
  );
};

AddressItem.propTypes = {
  address: PropTypes.object
};