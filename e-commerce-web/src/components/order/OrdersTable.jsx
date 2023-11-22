import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};

export const OrdersTable = ({data = []}) => {
  return (
    <Box width={'100%'}>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="500">Order</Typography></TableCell>
              <TableCell align="center"><Typography variant="subtitle1" fontWeight="500">Date</Typography></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="500">Order Status</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1" fontWeight="500">Total
                (Rs)</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(order => (
              <TableRow
                key={order.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <Link href={`orders/${order.id}`}
                        underline="none"
                        sx={{color: '#26a69a', '&:hover': {color: '#ffab40'}}}>
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell align="center">{formatDate(order.orderDate)}</TableCell>
                <TableCell align="center">{order.status}</TableCell>
                <TableCell align="right">{order.totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

OrdersTable.propTypes = {
  data: PropTypes.array
};