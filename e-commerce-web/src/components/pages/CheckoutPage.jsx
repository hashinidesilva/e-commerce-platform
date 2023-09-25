import { Grid } from "@mui/material";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { AddressCard } from "../user/AddressCard.jsx";
import { PaymentMethods } from "../user/PaymentMethods.jsx";

export const CheckoutPage = () => {
  return (
    <Grid container spacing={2}
          sx={{marginTop: "2rem", display: 'flex', justifyContent: "center", padding: '3rem'}}>
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
        <OrderSummary isInCheckout={true}/>
      </Grid>
    </Grid>
  );
};