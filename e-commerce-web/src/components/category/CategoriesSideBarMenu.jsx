import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { useCategories } from "../../hooks/useCategories.jsx";

export const CategoriesSideBarMenu = ({isOpened, handleClose}) => {
  const navigate = useNavigate();
  const {data} = useCategories();
  const categories = data?.items ?? [];

  const menuItemClickHandler = (categoryName) => {
    handleClose(true);
    navigate(`${categoryName}`);
  };

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={handleClose}
      sx={{width: '20%'}}>
      <DialogTitle sx={{backgroundColor: '#00695c', color: 'white'}}>Categories</DialogTitle>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onClick={menuItemClickHandler.bind(null, category.name)}>
            {category.name}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

CategoriesSideBarMenu.propTypes = {
  isOpened: PropTypes.bool,
  handleClose: PropTypes.func
};
