import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import { OrdersTable } from "../order/OrdersTable.jsx";
import { useOrders } from "../../hooks/useOrders.jsx";
import { NoOrders } from "../order/NoOrders.jsx";
import { UserForm } from "../user/UserForm.jsx";
import { UserContext } from "../../store/user-context.jsx";
import { AddressContext } from "../../store/address-context.jsx";
import { AddressItem } from "../user/AddressItem.jsx";

const UserInfo = ({user}) => {
  const [editUserInfo, setEditUserInfo] = useState(false);
  return (
    <Card sx={{minHeight: 180}}>
      <CardContent>
        <Stack direction={"row"} sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
          <Typography sx={{mb: '1rem', fontSize: 18}} fontWeight="bold">
            Personal Profile
          </Typography>
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => setEditUserInfo(true)}>
            Edit
          </Typography>
        </Stack>
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
      {editUserInfo && <UserForm isOpen={editUserInfo} user={user}
                                 handleClose={() => setEditUserInfo(false)}/>}
    </Card>
  );
};

const AddressBook = () => {
  const navigate = useNavigate();
  const addressCtx = useContext(AddressContext);
  // const [editAddress, setEditAddress] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9004/users/1/addresses").then((response) => {
      const addresses = response.data;
      addressCtx.changeAddressList(addresses);
    });
  }, []);

  const defaultAddress = addressCtx.addresses?.find(address => address.isDefault);

  return (
    <Card sx={{minHeight: 180}}>
      <CardContent>
        <Stack direction={"row"} sx={{display: 'flex', justifyContent: "space-between", alignItems: "flex-start"}}>
          <Typography sx={{mb: '1rem', fontSize: 18}} fontWeight="bold">
            Address Book
          </Typography>
          <Typography variant="subtitle2" sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}
                      onClick={() => navigate("addresses")}>
            Edit
          </Typography>
        </Stack>
        <Typography fontSize={14} color={"text.secondary"} gutterBottom>
          Default Delivery Address
        </Typography>
        <AddressItem address={defaultAddress}/>
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
export const MyAccountPage = () => {
  const userCtx = useContext(UserContext);
  const {data: orders} = useOrders();

  useEffect(() => {
    axios.get("http://localhost:9004/users/1").then((response) => {
      const userInfo = response.data;
      userCtx.updateUser(userInfo);
    });
  }, []);

  const user = userCtx.user;
  const recentOrders = orders?.sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <Box width={'100%'}>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
        Manage My Account
      </Typography>
      <Grid container spacing={2} sx={{justifyContent: 'space-between', display: 'flex', marginBottom: '2rem'}}>
        <Grid item xs={4}>
          <UserInfo user={user}/>
        </Grid>
        <Grid item xs={7}>
          <AddressBook/>
        </Grid>
      </Grid>
      <RecentOrders orders={recentOrders}/>
    </Box>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object
};

RecentOrders.propTypes = {
  orders: PropTypes.array
};