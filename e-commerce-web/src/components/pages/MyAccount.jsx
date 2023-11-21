import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useUser } from "../../hooks/useUser.jsx";
import { OrdersTable } from "../order/OrdersTable.jsx";
import { useOrders } from "../../hooks/useOrders.jsx";
import PropTypes from "prop-types";
import { NoOrders } from "../order/NoOrders.jsx";

const UserInfo = ({user}) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{mb: '1rem', fontSize: 18}} fontWeight="bold">
          Personal Profile
        </Typography>
        <Typography fontSize={14} gutterBottom>
          {user?.name}
        </Typography>
        <Typography fontSize={14} gutterBottom>
          {user?.email}
        </Typography>
        <Typography fontSize={14}>
          {user?.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AddressBook = ({addresses}) => {
  const defaultAddress = addresses?.find(address => address.isDefault);
  console.log("ADD", addresses);
  console.log("defaultAddress", defaultAddress);
  return (
    <Card>
      <CardContent>
        <Typography sx={{mb: '1rem', fontSize: 18}} fontWeight="bold">
          Address Book
        </Typography>
        <Typography fontSize={14} color={"text.secondary"} gutterBottom>
          Default Delivery Address
        </Typography>
        <Typography fontSize={14} fontWeight={"bold"}>
          {defaultAddress?.name}
        </Typography>
        <Typography variant="body2">{defaultAddress?.address}</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">{defaultAddress?.province},</Typography>
          <Typography variant="body2">{defaultAddress?.city},</Typography>
          <Typography variant="body2">{defaultAddress?.postalCode}</Typography>
        </Stack>
        <Typography variant="body2">{defaultAddress?.phoneNumber}</Typography>
      </CardContent>
    </Card>
  );
};

const RecentOrders = ({orders = []}) => {
  return (
    <Card>
      <Typography sx={{p: '1rem', fontSize: 18}} fontWeight="bold">
        Recent orders
      </Typography>
      {orders.length > 0 ? <OrdersTable data={orders}/> : <NoOrders/>}
    </Card>
  );
};
export const MyAccount = () => {
  const {data} = useUser(1);
  const {data: orders} = useOrders();
  const recentOrders = orders?.sort((a, b) => b.id - a.id).slice(0, 3);
  return (
    <Box width={'100%'}>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
        Manage My Account
      </Typography>
      <Grid container spacing={2} sx={{justifyContent: 'space-between', display: 'flex'}}>
        <Grid item xs={4} sx={{height: '100%'}}>
          <UserInfo user={data}/>
        </Grid>
        <Grid item xs={7} style={{height: '250px'}}>
          <AddressBook addresses={data?.addresses}/>
        </Grid>
      </Grid>
      <RecentOrders orders={recentOrders}/>
    </Box>
  );
};

AddressBook.propTypes = {
  addresses: PropTypes.array
};

UserInfo.propTypes = {
  user: PropTypes.object
};

RecentOrders.propTypes = {
  orders: PropTypes.array
};