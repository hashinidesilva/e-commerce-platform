import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, Typography } from "@mui/material";

export const EmptyCart = () => {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: "60vh",
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <AddShoppingCartIcon sx={{fontSize: 80, marginBottom: 2}}/>
      <Typography variant="h4" component="h2">
        {"Your cart is empty"}
      </Typography>
    </Card>
  );
};