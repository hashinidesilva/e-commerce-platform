import { Card, Typography } from "@mui/material";
import { AddressItem } from "./AddressItem.jsx";

/*const addresses = [{
  name: "Test name",
  address: "test",
  city: "Test city",
  province: "Test province",
  phoneNumber: '0111111',
  postalCode: "1111"
}];*/

const addresses = [];
export const AddressCard = () => {
  const address = addresses[0];
  return (
    <Card sx={{p: 3}}>
      <Typography variant="h6" gutterBottom fontWeight={600}>Shipping Address</Typography>
      {addresses.length === 0 ? (
        <Typography sx={{color: "#00838f", '&:hover': {cursor: 'grab'}}}>
          Add a new address
        </Typography>
      ) : <AddressItem address={address}/>}
    </Card>
  );
};