import { useContext } from "react";
import { Card, CardContent, Checkbox, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from "@mui/icons-material/Inventory";
import { QuantityCounter } from "../common/QuantityCounter.jsx";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem.jsx";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem.jsx";
import { EmptyCart } from "../order/EmptyCart.jsx";
import { useUpdateCart } from "../../hooks/useUpdateCart.jsx";
import { CartContext } from "../../store/cart-context.jsx";
import { Loading } from "../common/Loading.jsx";

const CartHeader = ({itemsSize = 0, selectedItemsSize = 0, cartId}) => {
  const {mutate: updateFunc} = useUpdateCart();

  const onSelectedChange = (selected) => {
    updateFunc({
      cartId,
      selected
    });
  };

  return (
    <>
      <Typography component="div" variant="h5" fontWeight="bold" paddingLeft={'0.5rem'}>
        Shopping Cart
      </Typography>
      <Typography component="div" variant="body2" gutterBottom>
        <Checkbox checked={itemsSize === selectedItemsSize}
                  onChange={(event) => onSelectedChange(event.target.checked)}/>
        {`Select all ${itemsSize} item(s)`}
      </Typography>
    </>
  );
};

const CartItem = ({item}) => {
  const cartCtx = useContext(CartContext);
  const {mutate: deleteFunc} = useDeleteCartItem();
  const {mutate: updateFunc} = useUpdateCartItem();
  const onUpdateQuantity = (quantity) => {
    cartCtx.changeQuantity(item.id, quantity);
    updateFunc({
      id: item.id,
      selected: item.selected,
      cartId: item.cartId,
      productId: item.product?.id,
      quantity: quantity
    });
  };

  const onUpdateSelected = (checked) => {
    cartCtx.changeSelected(item.id, checked);
    updateFunc({
      id: item.id,
      selected: checked,
      cartId: item.cartId,
      productId: item.product?.id,
      quantity: item.quantity
    });
  };

  const onItemRemove = (id) => {
    deleteFunc([cartCtx.cart?.id, id]);
    cartCtx.removeItem(id);
  };

  return (
    <Grid container spacing={1.5}
          sx={{display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
      <Grid item xs={0.5}>
        <Checkbox checked={item.selected} onChange={(event) => onUpdateSelected(event.target.checked)}/>
      </Grid>
      <Grid item xs={1.5}>
        <InventoryIcon sx={{fontSize: 80}}/>
      </Grid>
      <Grid item xs={5}>
        <Typography component="div" variant="subtitle1" sx={{flex: 2}}>
          {item.product?.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <QuantityCounter quantity={item.quantity} setQuantity={onUpdateQuantity}/>
      </Grid>
      <Grid item xs={1.5}>
        <Typography variant="h6" component="div">
          Rs. {item.product?.unitPrice}
        </Typography>
      </Grid>
      <Grid item xs={0.7}>
        <IconButton
          size="small"
          color="inherit"
          onClick={() => onItemRemove(item.id)}
          sx={{backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
        >
          <DeleteIcon/>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const CartPage = () => {
  const {data, isLoading} = useCart();
  const items = data?.items ?? [];
  const selectedItems = items.filter(item => item.selected);
  const selectedItemsSize = selectedItems.length;
  const subTotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.product?.unitPrice), 0);
  const itemsCount = selectedItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <>
      {isLoading && <Loading/>}
      {(items.length === 0 && !isLoading) && <EmptyCart/>}
      {(items.length > 0 && !isLoading) &&
        <Grid container spacing={2}
              sx={{display: 'flex', justifyContent: "center"}}>
          <Grid item xs={9}>
            <Card sx={{padding: 2, alignItems: 'center'}}>
              <CartHeader itemsSize={items.length} selectedItemsSize={selectedItemsSize} cartId={data.id}/>
              <Divider/>
              <Stack sx={{mt: 3}}>
                {items.sort((a, b) => a.id - b.id).map((item) => (
                  <div key={item.id}>
                    <CartItem item={item}/>
                    <Divider/>
                  </div>
                ))}
              </Stack>
              <CardContent style={{textAlign: 'right'}}>
                <Typography component="div" variant="body1" fontWeight="bold">
                  {`Subtotal (${itemsCount} ${itemsCount > 1 ? "items" : "item"}): Rs.${subTotal}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <OrderSummary selectedItems={selectedItems}/>
          </Grid>
        </Grid>
      }
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

CartHeader.propTypes = {
  itemsSize: PropTypes.number,
  selectedItemsSize: PropTypes.number,
  cartId: PropTypes.number
};