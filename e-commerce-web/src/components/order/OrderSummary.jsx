import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useAddOrder } from "../../hooks/useAddOrder.jsx";
import { useDeleteCartItems } from "../../hooks/useDeleteCartItems.jsx";
import { CartContext } from "../../store/cart-context.jsx";

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
export const OrderSummary = ({isInCheckout = false, selectedItems = [], cartId = 0}) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const {mutate: deleteItemsFunc} = useDeleteCartItems();
  const {mutate: orderFunc} = useAddOrder({
    onSuccess: () => {
      deleteItemsFunc([cartId]);
      cartCtx.removeCart();
    }
  });
  const subTotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.product?.unitPrice), 0);
  const shippingFee = subTotal > 0 ? 100 : 0;
  const total = subTotal + shippingFee;

  const onPlaceOrder = () => {
    orderFunc({
      userId: 1,
      totalAmount: total,
      items: selectedItems.map(item => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.unitPrice,
          subTotal: item.quantity * item.product.unitPrice
        };
      })
    });
    navigate("/");
  };
  return (
    <Card sx={{padding: 3}}>
      <Typography variant="h5" fontWeight={600}>Summary</Typography>
      <Box sx={{my: 3}}>
        <SummaryLine title={'Subtotal'} value={subTotal}/>
        {subTotal > 0 && <SummaryLine title={'Shipping fee'} value={shippingFee}/>}
        <SummaryLine title={'Total'} value={total}/>
      </Box>
      {isInCheckout && (
        <Button fullWidth variant="contained" sx={{backgroundColor: "#ffb300", color: "black"}}
                onClick={onPlaceOrder}>
          Place Order
        </Button>
      )}
      {!isInCheckout && (
        <Button fullWidth variant="contained" sx={{backgroundColor: "#ffb300", color: "black"}} disabled={total <= 0}
                onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </Button>
      )}
    </Card>
  );
};

SummaryLine.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

OrderSummary.propTypes = {
  selectedItems: PropTypes.array,
  isInCheckout: PropTypes.bool,
  cartId: PropTypes.number
};