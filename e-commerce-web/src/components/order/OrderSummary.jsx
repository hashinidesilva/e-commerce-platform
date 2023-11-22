import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SummaryLine = ({title, value}) => {
  return (
    <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
      <Typography sx={{mb: 1.5}} color="text.secondary">
        {title}
      </Typography>
      <Typography sx={{mb: 1.5}}>
        {value}
      </Typography>
    </Stack>
  );
};
export const OrderSummary = ({subTotal}) => {
  const shippingFee = subTotal > 0 ? 100 : 0;
  const total = subTotal + shippingFee;

  return (
    <>
      <Typography sx={{fontSize: 20}} fontWeight={600}>Summary</Typography>
      <Box sx={{marginTop: 3}}>
        <SummaryLine title={'Subtotal'} value={subTotal}/>
        {subTotal > 0 && <SummaryLine title={'Shipping fee'} value={shippingFee}/>}
        <SummaryLine title={'Total'} value={total}/>
      </Box>
    </>
  );
};

SummaryLine.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

OrderSummary.propTypes = {
  subTotal: PropTypes.number
};