import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SearchProducts } from "../product/SearchProducts.jsx";
import { CartContext } from "../../store/cart-context.jsx";

export const NavBar = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;
  const cartSize = items.reduce((acc, item) => acc + item?.quantity, 0);

  useEffect(() => {
    axios.get("http://localhost:9003/carts").then((response) => {
      const cartItems = response.data?.items;
      cartCtx.setInitialItems(cartItems?.map(item => {
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity
        };
      }));
    });
  }, []);

  return (
    <Toolbar sx={{backgroundColor: "#004d40", justifyContent: 'space-between'}}>
      <Typography
        variant="h6"
        component="div"
        onClick={() => navigate("/")}
        sx={{'&:hover': {cursor: 'grab'}}}>
        E-Commerce
      </Typography>
      <SearchProducts/>
      <Stack direction="row" spacing={4} sx={{marginLeft: 4, justifyContent: 'flex-end', alignItems: 'center'}}>
        <PersonIcon/>
        <LanguageIcon/>
        <Badge badgeContent={cartSize} color="warning">
          <IconButton
            size="small"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon/>
          </IconButton>
        </Badge>
      </Stack>
    </Toolbar>
  );
};