import { Box, Typography } from "@mui/material";
import { useOrders } from "../../hooks/useOrders.jsx";
import { OrdersTable } from "../order/OrdersTable.jsx";
import { NoOrders } from "../order/NoOrders.jsx";

export const OrdersPage = () => {
  const {data} = useOrders();
  return (
    <Box width={'100%'}>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
        My Orders
      </Typography>
      {data.length > 0 ? <OrdersTable data={data}/> : <NoOrders/>}
    </Box>
  );
};