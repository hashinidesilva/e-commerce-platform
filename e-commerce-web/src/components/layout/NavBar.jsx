import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge, ClickAwayListener, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
// import LanguageIcon from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SearchProducts } from "../product/SearchProducts.jsx";
import { CartContext } from "../../store/cart-context.jsx";

export const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartCtx = useContext(CartContext);
  const items = cartCtx.cart?.items ?? [];
  const cartSize = items.reduce((acc, item) => acc + item?.quantity, 0);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrders = () => {
    handleClose();
    navigate("/orders");
  };

  const handleMyAccount = () => {
    handleClose();
    navigate("/account");
  };

  useEffect(() => {
    axios.get("http://localhost:9003/carts").then((response) => {
      if (response.status === 200) {
        const cart = response.data;
        cartCtx.updateCart(cart);
      } else if (response.status === 204) {
        axios.post("http://localhost:9003/carts", {userId: 1}).then(response => {
          const cart = response.data;
          cartCtx.updateCart(cart);
        });
      }
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
        <IconButton
          size="small"
          color="inherit"
          onClick={handleClick}
          onMouseOver={handleClick}
        >
          <PersonIcon sx={{'&:hover': {backgroundColor: '#00695c'}}}/>
        </IconButton>
        <ClickAwayListener onClickAway={handleClose}>
          <Menu
            id="user"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{onMouseLeave: handleClose}}
          >
            <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
            <MenuItem onClick={handleOrders}>My Orders</MenuItem>
          </Menu>
        </ClickAwayListener>
        {/*<LanguageIcon/>*/}
        <Badge badgeContent={cartSize} color="warning" sx={{'&:hover': {backgroundColor: '#00695c'}}}>
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