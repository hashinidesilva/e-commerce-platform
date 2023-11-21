import { useContext } from "react";
import { Grid } from "@mui/material";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { AddressCard } from "../user/AddressCard.jsx";
import { PaymentMethods } from "../user/PaymentMethods.jsx";
import { CartContext } from "../../store/cart-context.jsx";

export const CheckoutPage = () => {
  const cartCtx = useContext(CartContext);
  const selectedItems = cartCtx.cart?.items?.filter(item => item.selected);

  return (
    <Grid container spacing={2}
          sx={{display: 'flex', justifyContent: "center"}}>
      <Grid item xs={8}>
        <Grid container spacing={2} direction={"column"}>
          <Grid item>
            <AddressCard/>
          </Grid>
          <Grid item>
            <PaymentMethods/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <OrderSummary isInCheckout={true} selectedItems={selectedItems} cartId={cartCtx.cart?.id}/>
      </Grid>
    </Grid>
  );
};