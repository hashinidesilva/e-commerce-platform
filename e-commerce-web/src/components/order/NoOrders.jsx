import { Card, Typography } from "@mui/material";

export const NoOrders = () => {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: "30vh",
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography variant="h4" component="h2">
        {"No orders"}
      </Typography>
    </Card>
  );
};