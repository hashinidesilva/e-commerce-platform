import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";

export const Layout = ({changeOpen}) => {

  return (
    <AppBar position="static">
      <Toolbar sx={{backgroundColor: "#004d40"}}>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          E-Commerce
        </Typography>
      </Toolbar>
      <Toolbar sx={{backgroundColor: "#00695c"}}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => changeOpen(true)}
          sx={{mr: 2}}
        >
          <MenuIcon/>
          <Typography
            variant="h6"
            sx={{
              display: {xs: 'none', md: 'flex', paddingLeft: '10px'},
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            All
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Layout.propTypes = {
  changeOpen: PropTypes.func
};