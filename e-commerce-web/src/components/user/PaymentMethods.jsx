import { Card, Typography } from "@mui/material";

export const PaymentMethods = () => {
  return (
    <Card sx={{p: 3}}>
      <Typography sx={{fontSize: 20}} gutterBottom fontWeight={600}>Payment Methods</Typography>
      <Typography sx={{color: "#00838f", fontSize: 15, '&:hover': {cursor: 'grab'}}}>
        Select Payment Method
      </Typography>
    </Card>
  );
};