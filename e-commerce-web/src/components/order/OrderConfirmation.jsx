import { useNavigate } from "react-router-dom";
import { Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from "prop-types";

export const OrderConfirmation = ({orderNumber}) => {
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
        <CheckCircleIcon sx={{fontSize: 80}} color={"success"}/>
        <Typography variant="h4">Thanks for your order</Typography>
        <Typography variant="h6">Your order number is {orderNumber}</Typography>
        <Button variant={'outlined'}
                onClick={() => navigate("/")}
                size={"large"}
                sx={{borderColor: "#ffb300", '&:hover': {borderColor: '#ffb300', backgroundColor: '#fff8e1'}}}>
          <Typography variant="body1" color={"#ffb300"}>Return to Home Page</Typography>
        </Button>
      </Stack>
    </Card>
  );
};

OrderConfirmation.propTypes = {
  orderNumber: PropTypes.number
};