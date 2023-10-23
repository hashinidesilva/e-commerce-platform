import { useState } from "react";
import { AppBar, Box } from "@mui/material";
import PropTypes from "prop-types";
import { NavBar } from "./NavBar.jsx";
import { SubNavBar } from "./SubNavBar.jsx";
import { CategoriesSideBarMenu } from "../category/CategoriesSideBarMenu.jsx";

export const Layout = ({children}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="fixed">
        <NavBar/>
        <SubNavBar changeOpen={setOpen}/>
        {open && <CategoriesSideBarMenu isOpen={open} handleClose={() => setOpen(false)}/>}
      </AppBar>
      <Box width={'80%'} display={"flex"} justifyContent="center" m="auto" sx={{marginTop: '10rem'}}>
        {children}
      </Box>
    </>

  );
};

Layout.propTypes = {
  children: PropTypes.any
};