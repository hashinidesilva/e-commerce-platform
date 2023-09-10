import { Card, CardContent, Checkbox, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from "@mui/icons-material/Inventory";
import { QuantityCounter } from "../common/QuantityCounter.jsx";
import { OrderSummary } from "../order/OrderSummary.jsx";

const CartHeader = () => {
  return (
    <>
      <Typography component="div" variant="h5" fontWeight="bold">
        Shopping Cart
      </Typography>
      <Typography component="div" variant="body2">
        No items selected. {'Select all items'}
      </Typography>
    </>
  );
};

const CartItem = ({item}) => {
  return (
    <Stack direction={"row"} spacing={4} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox/>
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
        <Card sx={{padding: 2, alignItems: 'center'}}>
          <CartHeader is/>
          <Divider/>
          <Stack sx={{mt: 3}}>
            {ITEMS.map((item) => (
              <>
                <CartItem item={item}/>
                <Divider/>
              </>
            ))}
          </Stack>
          <CardContent style={{textAlign: 'right'}}>
            <Typography component="div" variant="body1" fontWeight="bold">
              Subtotal (1 item): $129.97
            </Typography>
          </CardContent>
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