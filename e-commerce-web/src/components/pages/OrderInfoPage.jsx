import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useOrder } from "../../hooks/useOrder.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";
import { getProductImagePath } from "../../util/CommonUtil.jsx";
import { Loading } from "../common/Loading.jsx";
import { OrderSummary } from "../order/OrderSummary.jsx";
import { AddReview } from "../product/AddReview.jsx";

const OrderItem = ({item, product}) => {
  const [addReview, setAddReview] = useState(false);
  return (
    <Grid container spacing={1.5}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            alignItems: 'center',
            margin: '0.3rem'
          }}>
      <Grid item xs={1.5}>
        <img src={getProductImagePath(product?.categoryId)} height={70} width={70} alt={"product"}/>
      </Grid>
      <Grid item xs={4.5}>
        <Typography component="div" variant="subtitle1">
          {product?.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography component="div" variant="subtitle1">
          Quantity: {item?.quantity}
        </Typography>
      </Grid>
      <Grid item xs={1.5}>
        <Typography component="div" variant="subtitle1">
          Rs. {item?.unitPrice}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Button size={"small"} color={"warning"} onClick={() => setAddReview(true)}>
          Write a review
        </Button>
      </Grid>
      {addReview &&
        <AddReview isOpen={addReview} handleClose={() => setAddReview(false)} productId={item.productId}/>}
    </Grid>
  );
};
export const OrderInfoPage = () => {
  const {orderId} = useParams();
  const {data, isLoading} = useOrder(orderId);
  const {data: products, isLoading: productsLoading} = useProducts();
  const subTotal = data?.items?.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <>
      {(isLoading || productsLoading) && <Loading/>}
      {!isLoading && !productsLoading && products && data && (
        <Box width={'100%'}>
          <Typography
            sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
            Order {orderId}
          </Typography>
          <Grid container spacing={2} sx={{justifyContent: 'space-between'}}>
            <Grid item xs={12}>
              <Card>
                {data?.items.map(item => (
                  <div key={item.id}>
                    <OrderItem item={item}
                               product={products.items.find((product) => product.id === item.productId)}/>
                    <Divider/>
                  </div>
                ))}
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{minHeight: 175, p: '1rem'}}>
                <Typography component="div" variant="subtitle1" gutterBottom fontWeight={"bold"}>
                  Shipping Address
                </Typography>
                {data.address.split(",").map((line, index) => (
                  <Typography key={index} component="div" variant="subtitle1">
                    {line}
                  </Typography>
                ))}
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card sx={{minHeight: 175, p: '1rem'}}>
                <OrderSummary subTotal={subTotal}/>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
  product: PropTypes.object
};