import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { getProductImagePath } from "../../util/CommonUtil.jsx";

export const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{width: 275, height: 350, '&:hover': {cursor: 'grab'}}}
      onClick={() => navigate(`/products/${product.name}/dp/${product.id}`)}>
      <CardMedia
        component="img"
        sx={{height: 200}}
        image={getProductImagePath(product.categoryId)}
        title="item"
      />
      <CardContent>
        <Typography varient="h1" gutterBottom>
          {product?.name}
        </Typography>
        <Typography varient="h1">
          Rs. {product?.unitPrice}
        </Typography>
        <Rating name="read-only" value={product?.averageRating ?? 0} readOnly size="small" precision={0.5}/>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
};