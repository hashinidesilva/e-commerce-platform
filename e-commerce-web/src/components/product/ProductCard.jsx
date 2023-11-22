import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";

const getPlaceHolderImage = (categoryId) => {
  let path;
  switch (categoryId) {
    case 1:
      path = "/assets/placeholder/baby.jpeg";
      break;
    case 2:
      path = "/assets/placeholder/beauty and personal care.jpeg";
      break;
    case 3:
      path = "/assets/placeholder/book.jpeg";
      break;
    case 4:
      path = "/assets/placeholder/boys fashion.jpeg";
      break;
    case 5:
      path = "/assets/placeholder/computers.jpeg";
      break;
    case 6:
      path = "/assets/placeholder/electronics.jpeg";
      break;
    case 7:
      path = "/assets/placeholder/girls fashion.jpeg";
      break;
    case 8:
      path = "/assets/placeholder/health and household.jpeg";
      break;
    case 9:
      path = "/assets/placeholder/home and kitchen.jpeg";
      break;
    case 10:
      path = "/assets/placeholder/placeholder.jpeg";
      break;
    case 11:
      path = "/assets/placeholder/pets.jpeg";
      break;
    case 12:
      path = "/assets/placeholder/sports.jpeg";
      break;
    case 13:
      path = "/assets/placeholder/toys.jpeg";
      break;
    case 14:
      path = "/assets/placeholder/womens fashion.jpeg";
      break;
    default:
      path = "/assets/placeholder/placeholder.jpeg";
      break;
  }
  return path;
};
export const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{width: 275, height: 350, '&:hover': {cursor: 'grab'}}}
      onClick={() => navigate(`/products/${product.name}/dp/${product.id}`)}>
      <CardMedia
        component="img"
        sx={{height: 200}}
        image={getPlaceHolderImage(product.categoryId)}
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