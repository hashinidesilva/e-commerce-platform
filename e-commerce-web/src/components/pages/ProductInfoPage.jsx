import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const ProductInfoPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(0);
  const {product} = params;

  const handleChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setQuantity(event.target.value);
    }
  };

  return (
    <Box sx={{marginTop: "50px", display: "flex", justifyContent: "center"}}>
      <Card sx={{display: 'flex', padding: 2, width: '70%', alignItems: 'center'}}>
        <InventoryIcon sx={{fontSize: 200, marginBottom: 2}}/>
        {/*<CardMedia*/}
        {/*  component="img"*/}
        {/*  sx={{width: '40%'}}*/}
        {/*  image={"src/assets/electronics.jpg"}*/}
        {/*  alt="product"*/}
        {/*/>*/}
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>
            <Stack spacing={4}>
              <Typography component="div" variant="h5" gutterBottom>
                Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive
                Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone
              </Typography>
              <Divider/>
              <Typography variant="h6" component="div">
                Rs. 88
              </Typography>
              <Stack direction="row" spacing={4} sx={{alignItems: 'center'}}>
                <Typography variant="subtitle1" component="div">
                  Quantity
                </Typography>
                <TextField
                  id="qunatity"
                  type="text"
                  size="small"
                  value={quantity}
                  onChange={handleChange}
                  sx={{width: '20%'}}
                  inputProps={{style: {textAlign: 'center'}}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          size="small"
                          color="inherit"
                          disabled={quantity <= 0}
                          onClick={() => setQuantity((prevVal) => prevVal - 1)}
                          sx={{borderRadius: 0, backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
                        >
                          <RemoveIcon/>
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() => setQuantity((prevVal) => prevVal + 1)}
                          sx={{borderRadius: 0, backgroundColor: "white", '&:hover': {backgroundColor: 'white'}}}
                        >
                          <AddIcon/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={4} sx={{justifyContent: 'flex-start'}}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffc107",
                    color: 'black',
                    width: '25%',
                    '&:hover': {backgroundColor: '#ffb300'}
                  }}>
                  Buy Now
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff8f00",
                    color: 'black',
                    width: '25%',
                    '&:hover': {backgroundColor: '#ff6f00'}
                  }}>
                  Add to Cart
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};