import { Card, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from "@mui/icons-material/Inventory";
import { QuantityCounter } from "../common/QuantityCounter.jsx";
import { OrderSummary } from "../order/OrderSummary.jsx";

const CartItem = ({item}) => {
  return (
    <Stack direction={"row"} spacing={4} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <InventoryIcon sx={{fontSize: 80}}/>
      <Typography component="div" variant="subtitle1" sx={{flex: 2}}>
        Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive
        Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone
      </Typography>
      <QuantityCounter quantity={item.quantity} setQuantity={() => 5} width="15%"/>
      <Typography variant="h6" component="div">
        Rs. 88
      </Typography>
      <IconButton
        size="small"
        color="inherit"
        // onClick={() => setQuantity((prevVal) => prevVal - 1)}
        sx={{backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
      >
        <DeleteIcon/>
      </IconButton>
    </Stack>
  );
};

const ITEMS = [{quantity: 8}, {quantity: 10}];
export const CartPage = () => {
  return (
    <Grid container spacing={2}
          sx={{marginTop: "50px", display: 'flex', justifyContent: "center"}}>
      <Grid item xs={9}>
        <Card sx={{display: 'flex', padding: 2, alignItems: 'center'}}>
          <Stack>
            {ITEMS.map((item) => (
              <>
                <CartItem item={item}/>
                <Divider/>
              </>
            ))}
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <OrderSummary/>
      </Grid>
    </Grid>
  );
};

CartItem.propTypes = {
  item: PropTypes.object
};