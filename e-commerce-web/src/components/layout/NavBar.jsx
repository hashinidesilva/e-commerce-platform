import { useNavigate } from "react-router-dom";
import { Badge, Stack, Toolbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SearchProducts } from "../product/SearchProducts.jsx";

export const NavBar = () => {
  const navigate = useNavigate();
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
      <Stack direction="row" spacing={4} sx={{marginLeft: 4, justifyContent: 'flex-end'}}>
        <PersonIcon/>
        <LanguageIcon/>
        <Badge badgeContent={4} color="warning">
          <ShoppingCartIcon/>
        </Badge>
      </Stack>
    </Toolbar>
  );
};