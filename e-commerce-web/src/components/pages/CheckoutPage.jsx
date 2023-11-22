import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid } from "@mui/material";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { AddressCard } from "../user/AddressCard.jsx";
import { PaymentMethods } from "../user/PaymentMethods.jsx";
import { CartContext } from "../../store/cart-context.jsx";
import { AddressContext } from "../../store/address-context.jsx";
import { useAddOrder } from "../../hooks/useAddOrder.jsx";
import { useDeleteCartItems } from "../../hooks/useDeleteCartItems.jsx";
import { OrderConfirmation } from "../order/OrderConfirmation.jsx";

export const CheckoutPage = () => {
  const cartCtx = useContext(CartContext);
  const addressCtx = useContext(AddressContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const navigate = useNavigate();
  const {mutate: deleteItemsFunc} = useDeleteCartItems();
  const {mutate: orderFunc} = useAddOrder({
    onSuccess: (response) => {
      deleteItemsFunc([cartCtx.cart?.id]);
      cartCtx.removeCart();
      setIsOrderPlaced(true);
      setOrderNumber(response?.id);
    }
  });

  const selectedItems = cartCtx.cart?.items?.filter(item => item.selected) ?? [];
  const subTotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.product?.unitPrice), 0);
  const shippingFee = subTotal > 0 ? 100 : 0;
  const total = subTotal + shippingFee;

  useEffect(() => {
    if (!isOrderPlaced && total <= 0) {
      navigate("/");
    }
  }, [isOrderPlaced, navigate, total]);
  const onPlaceOrder = () => {
    const selectedAddress = addressCtx.selectedAddress;

    orderFunc({
      userId: 1,
      totalAmount: total,
      shippingAmount: shippingFee,
      address: selectedAddress.name + "," + selectedAddress.address + "," + selectedAddress.city + "," +
        selectedAddress.province + "," + selectedAddress.postalCode + selectedAddress.phoneNumber,
      items: selectedItems.map(item => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.unitPrice,
          subTotal: item.quantity * item.product.unitPrice
        };
      }),
    });
  };

  return (
    <>
      {isOrderPlaced && <OrderConfirmation orderNumber={orderNumber}/>}
      {!isOrderPlaced && total > 0 && (
        <Grid container spacing={2}
              sx={{display: 'flex', justifyContent: "center"}}>
          <Grid item xs={8}>
            <Grid container spacing={2} direction={"column"}>
              <Grid item>
                <AddressCard addresses={addressCtx.addresses}/>
              </Grid>
              <Grid item>
                <PaymentMethods/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{padding: 3}}>
              <OrderSummary subTotal={subTotal}/>
              <Button fullWidth variant="contained" sx={{backgroundColor: "#ffb300", color: "black"}}
                      onClick={onPlaceOrder} disabled={total <= 0}>
                Place Order
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};