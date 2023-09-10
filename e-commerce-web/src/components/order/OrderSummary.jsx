import { Box, Button, Card, Stack, Typography } from "@mui/material";
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
export const OrderSummary = () => {
  return (
    <Card sx={{padding: 2}}>
      <Typography variant="h5">Summary</Typography>
      <Box sx={{my: 3}}>
        <SummaryLine title={'Subtotal'} value={10}/>
        <SummaryLine title={'Shipping fee'} value={100}/>
        <SummaryLine title={'Total'} value={110}/>
      </Box>
      <Button fullWidth variant="contained" sx={{backgroundColor: "#ffb300", color: "black"}}>
        Proceed to checkout
      </Button>
    </Card>
  );
};

SummaryLine.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};