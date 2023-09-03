import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { useCategories } from "../hooks/useCategories.jsx";

export const CategoriesMenu = ({isOpened, handleClose}) => {
  const {data} = useCategories();
  const categories = data?.items ?? [];

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={handleClose}
      sx={{width: '20%'}}>
      <DialogTitle sx={{backgroundColor: '#00695c', color: 'white'}}>Categories</DialogTitle>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>{category.name}</ListItem>
        ))}
      </List>
    </Dialog>
  );
};

CategoriesMenu.propTypes = {
  isOpened: PropTypes.bool,
  handleClose: PropTypes.func
};
