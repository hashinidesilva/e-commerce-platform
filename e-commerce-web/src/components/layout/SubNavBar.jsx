import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";

export const SubNavBar = ({changeOpen}) => {
  return (
    <Box sx={{
      backgroundColor: "#00695c",
      paddingLeft: '1rem',
      height: '40px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <IconButton
        size="small"
        // edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => changeOpen(true)}
        sx={{mr: 2, borderRadius: 0}}
      >
        <MenuIcon/>
        <Typography
          variant="subtitle1"
          sx={{
            display: {paddingLeft: '10px'},
            // fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          All
        </Typography>
      </IconButton>
    </Box>
  );
};

SubNavBar.propTypes = {
  changeOpen: PropTypes.func
};