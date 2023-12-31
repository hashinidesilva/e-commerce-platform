import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Card, Stack, Typography } from "@mui/material";

export const EmptyCart = () => {
  const navigate = useNavigate();
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
      <Stack spacing={3} sx={{alignItems: 'center'}}>
        <AddShoppingCartIcon sx={{fontSize: 80}}/>
        <Typography variant="h5">Your cart is empty</Typography>
        <Button variant={'outlined'}
                onClick={() => navigate("/")}
                size={"large"}
                sx={{borderColor: "#ffb300", '&:hover': {borderColor: '#ffb300', backgroundColor: '#fff8e1'}}}>
          <Typography variant="body1" color={"#ffb300"}>Continue shopping</Typography>
        </Button>
      </Stack>
    </Card>
  );
};