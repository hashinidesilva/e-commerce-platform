import { useDispatch } from "react-redux";
import { Card, CardContent, Checkbox, Divider, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from "@mui/icons-material/Inventory";
import { QuantityCounter } from "../common/QuantityCounter.jsx";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { cartActions } from "../../store/store.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem.jsx";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem.jsx";
import { EmptyCart } from "../order/EmptyCart.jsx";

const CartHeader = ({itemsSize = 0, selectedItemsSize = 0}) => {
  return (
    <>
      <Typography component="div" variant="h5" fontWeight="bold">
        Shopping Cart
      </Typography>
      <Typography component="div" variant="body2">
        {selectedItemsSize === 0 && "No items selected. "}
        {selectedItemsSize < itemsSize && <Link underline="none">{'Select all items'}</Link>}
        {selectedItemsSize === itemsSize &&
          <Link underline="none">{'Deselect all items'}</Link>}
      </Typography>
    </>
  );
};

const CartItem = ({item, deleteItem, updateItem}) => {
  const onUpdateQuantity = (quantity) => {
    updateItem({
      ...item,
      quantity: quantity
    });
  };

  return (
    <Stack direction={"row"} spacing={4} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox checked={item.selected}/>
      <InventoryIcon sx={{fontSize: 80}}/>
      <Typography component="div" variant="subtitle1" sx={{flex: 2}}>
        Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive
        Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone
      </Typography>
      <QuantityCounter quantity={item.quantity} setQuantity={onUpdateQuantity} width="15%"/>
      <Typography variant="h6" component="div">
        Rs. 88
      </Typography>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => deleteItem(item.id)}
        sx={{backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
      >
        <DeleteIcon/>
      </IconButton>
    </Stack>
  );
};

export const CartPage = () => {
  const {data} = useCart();
  const {mutate: deleteFunc} = useDeleteCartItem();
  const {mutate: updateFunc} = useUpdateCartItem();
  const dispatch = useDispatch();
  const items = data?.items ?? [];
  const selectedItems = items.filter(item => item.selected);
  const selectedItemsSize = selectedItems.length;
  const subTotal = selectedItems.reduce((acc, item) => acc + (item.quantity * 10), 0);

  const onItemUpdate = (item) => {
    updateFunc(item);
  };
  const onItemRemove = (id) => {
    deleteFunc(id);
    dispatch(cartActions.remove(id));
  };

  if (items.length <= 0) {
    return (
      <EmptyCart/>
    );
  }

  return (
    <Grid container spacing={2}
          sx={{marginTop: "50px", display: 'flex', justifyContent: "center"}}>
      <Grid item xs={9}>
        <Card sx={{padding: 2, alignItems: 'center'}}>
          <CartHeader itemsSize={items.length} selectedItemsSize={selectedItemsSize}/>
          <Divider/>
          <Stack sx={{mt: 3}}>
            {items.map((item) => (
              <div key={item.id}>
                <CartItem item={item} deleteItem={onItemRemove} updateItem={onItemUpdate}/>
                <Divider/>
              </div>
            ))}
          </Stack>
          <CardContent style={{textAlign: 'right'}}>
            <Typography component="div" variant="body1" fontWeight="bold">
              {`Subtotal (${selectedItemsSize} ${selectedItemsSize > 1 ? "items" : "item"}): Rs.${subTotal}`}
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
  item: PropTypes.object,
  deleteItem: PropTypes.func,
  updateItem: PropTypes.func
};

CartHeader.propTypes = {
  itemsSize: PropTypes.number,
  selectedItemsSize: PropTypes.number
};