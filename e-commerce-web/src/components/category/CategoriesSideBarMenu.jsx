import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, ListItemText, MenuItem, MenuList } from "@mui/material";
import PropTypes from "prop-types";
import { useCategories } from "../../hooks/useCategories.jsx";

export const CategoriesSideBarMenu = ({isOpened, handleClose}) => {
  const navigate = useNavigate();
  const {data} = useCategories();
  const categories = data?.items ?? [];

  const menuItemClickHandler = (categoryName) => {
    handleClose(true);
    navigate(`${categoryName.toLowerCase()}`);
  };

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={handleClose}
      sx={{width: '20%'}}>
      <DialogTitle sx={{backgroundColor: '#00695c', color: 'white'}}>Categories</DialogTitle>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            sx={{paddingX: 3, paddingY: 1.5}}
            onClick={menuItemClickHandler.bind(null, category.name)}>
            <ListItemText> {category.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Dialog>
  );
};

CategoriesSideBarMenu.propTypes = {
  isOpened: PropTypes.bool,
  handleClose: PropTypes.func
};