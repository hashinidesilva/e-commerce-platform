import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Rating, Stack, Typography } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import { CartNavigation } from "../order/CartNavigation.jsx";
import { QuantityCounter } from "../common/QuantityCounter.jsx";
import { useProduct } from "../../hooks/useProduct.jsx";
import { useAddCartItem } from "../../hooks/useAddCartItem.jsx";
import { CartContext } from "../../store/cart-context.jsx";
import { useRatings } from "../../hooks/useRatings.jsx";
import { RatingCard } from "../product/RatingCard.jsx";

export const ProductInfoPage = () => {
  const {productId} = useParams();
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [addToCart, setAddToCart] = useState(false);
  const {data} = useProduct(productId);
  const {data: ratings} = useRatings({productId: productId});
  const {mutate: cartFunc} = useAddCartItem({
    onSuccess: (item) => {
      cartCtx.addItem(item);
    }
  });

  const {id, name, unitPrice, averageRating} = data ?? {};
  const cartItems = cartCtx.cart?.items ?? [];

  const onAddToCart = () => {
    const cart = cartCtx.cart;
    const cartId = cart?.id;
    const existingItem = cartItems.find(item => item?.product?.id === id);
    if (existingItem) {
      cartFunc({
        cartId: cartId,
        id: existingItem?.id,
        selected: existingItem?.selected,
        quantity: existingItem.quantity + quantity,
        productId: id
      });
    } else {
      cartFunc({
        cartId: cartId,
        productId: id,
        quantity
      });
    }
    setAddToCart(true);
  };

  return (
    <Card sx={{padding: 2, width: '100%'}}>
      <Stack direction={"row"}>
        <InventoryIcon sx={{fontSize: 200, marginBottom: 2}}/>
        {/*<CardMedia*/}
        {/*  component="img"*/}
        {/*  sx={{width: '40%'}}*/}
        {/*  image={"src/assets/electronics.jpg"}*/}
        {/*  alt="product"*/}
        {/*/>*/}
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <CardContent sx={{flex: '1 0 auto'}}>
            <Stack spacing={2}>
              <Typography component="div" variant="h5" gutterBottom>
                {name?.length > 0 ? name : "Apple AirPods Pro (2nd Generation) Wireless Earbuds," +
                  " Up to 2X More Active Noise Cancelling, Adaptive Transparency, Personalized Spatial Audio, " +
                  "MagSafe Charging Case, Bluetooth Headphones for iPhone"}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Rating name="read-only" value={averageRating ?? 0} readOnly size="small" precision={0.5}/>
                <Typography
                  variant="body"
                  component="div"
                >
                  {ratings?.items?.length} ratings
                </Typography>
              </Stack>
              <Divider/>
              <Typography variant="h6" component="div">
                {/*Rs. 88*/}
                Rs. {unitPrice}
              </Typography>
              <Stack direction="row" spacing={4} sx={{alignItems: 'center'}}>
                <Typography variant="subtitle1" component="div">
                  Quantity
                </Typography>
                <QuantityCounter quantity={quantity} setQuantity={setQuantity} width="8rem"/>
              </Stack>
              <Stack direction="row" spacing={4} sx={{justifyContent: 'flex-start'}}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffc107",
                    color: 'black',
                    width: '10rem',
                    '&:hover': {backgroundColor: '#ffb300'}
                  }}>
                  Buy Now
                </Button>
                <Button
                  onClick={onAddToCart}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff8f00",
                    color: 'black',
                    width: '10rem',
                    '&:hover': {backgroundColor: '#ff6f00'}
                  }}>
                  Add to Cart
                </Button>
              </Stack>
            </Stack>
          </CardContent>
          {addToCart && (
            <CartNavigation
              isOpen={addToCart}
              itemSize={quantity}
              handleClose={() => setAddToCart(false)}/>
          )}
        </Box>
      </Stack>
      <Divider/>
      <RatingCard ratings={ratings?.items} averageRating={averageRating}/>
    </Card>
  );
};