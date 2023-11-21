import { Box, Typography } from "@mui/material";
import { useOrders } from "../../hooks/useOrders.jsx";
import { OrdersTable } from "../order/OrdersTable.jsx";
import { NoOrders } from "../order/NoOrders.jsx";
import { Loading } from "../common/Loading.jsx";

export const OrdersPage = () => {
  const {data, isLoading} = useOrders();
  return (
    <Box width={'100%'}>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
        My Orders
      </Typography>
      {isLoading && <Loading/>}
      {!isLoading && data?.length > 0 && <OrdersTable data={data}/>}
      {!isLoading && data?.length === 0 && <NoOrders/>}
    </Box>
  );
};