import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';

export const ProductInfoPage = () => {
  const params = useParams();
  const {product} = params;
  return (
    <Box sx={{marginTop: "50px", display: "flex", justifyContent: "center"}}>
      <Card sx={{display: 'flex', padding: 2, width: '70%'}}>
        <InventoryIcon sx={{fontSize: 200, marginBottom: 2}}/>
        {/*<CardMedia*/}
        {/*  component="img"*/}
        {/*  sx={{width: '40%'}}*/}
        {/*  image={"src/assets/electronics.jpg"}*/}
        {/*  alt="product"*/}
        {/*/>*/}
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>
            <Typography component="div" variant="h5" gutterBottom>
              Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive
              Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone
            </Typography>
            <Divider/>
            <Typography variant="h6" component="div" sx={{marginTop: 3}}>
              Rs. 88
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};