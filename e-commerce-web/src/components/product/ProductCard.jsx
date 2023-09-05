import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{width: 275, height: 400, '&:hover': {cursor: 'grab'}}}
      onClick={() => navigate(`/products/${product.name}`)}>
      <CardMedia
        component="img"
        sx={{height: 200}}
        image="src/assets/electronics.jpg"
        title="item"
      />
      <CardContent>
        <Typography varient="h1" gutterBottom>
          {product?.name}
        </Typography>
        <Typography varient="h1">
          Rs. {product?.unitPrice}
        </Typography>
        <Rating name="read-only" value={4} readOnly size="small"/>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
};