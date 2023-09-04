import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const SearchProducts = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <TextField
      id="search-text"
      placeholder="Search All Products"
      type="text"
      size="small"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      sx={{backgroundColor: "white", borderRadius: "4px", width: '40%'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              aria-label="search"
              sx={{backgroundColor: "#ffc107", '&:hover': {backgroundColor: '#ffb300'}}}
              onClick={() => navigate({
                pathname: '/products',
                search: `?name=${searchText}`,
              })}>
              <SearchIcon/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};