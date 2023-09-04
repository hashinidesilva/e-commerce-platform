import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const ProductCard = ({product}) => {
  return (
    <Card sx={{width: 275, height: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary">
          {product?.name}
        </Typography>
        <Typography sx={{fontSize: 14}} color="text.secondary">
          {product?.unitPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
};