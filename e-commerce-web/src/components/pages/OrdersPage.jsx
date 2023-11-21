import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useOrders } from "../../hooks/useOrders.jsx";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};
export const OrdersPage = () => {
  const {data} = useOrders();
  return (
    <Box width={'100%'}>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
        My Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Order</Typography></TableCell>
              <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Date</Typography></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">Order Status</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Total</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(order => (
              <TableRow
                key={order.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {/*<Link href={`orders/${order.id}`}*/}
                  {/*      underline="none"*/}
                  {/*      sx={{color: '#26a69a', '&:hover': {color: '#ffab40'}}}>*/}
                  {/*  {order.id}*/}
                  {/*</Link>*/}
                  {order.id}
                </TableCell>
                <TableCell align="center">{formatDate(order.orderDate)}</TableCell>
                <TableCell align="center">{order.status}</TableCell>
                <TableCell align="right">{order.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};