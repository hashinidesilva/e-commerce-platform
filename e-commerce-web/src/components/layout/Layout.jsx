import { useState } from "react";
import { AppBar } from "@mui/material";
import { NavBar } from "./NavBar.jsx";
import { SubNavBar } from "./SubNavBar.jsx";
import { CategoriesSideBarMenu } from "../category/CategoriesSideBarMenu.jsx";

export const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="static">
      <NavBar/>
      <SubNavBar changeOpen={setOpen}/>
      <CategoriesSideBarMenu isOpened={open} handleClose={() => setOpen(false)}/>
    </AppBar>
  );
};