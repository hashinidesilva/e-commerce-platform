import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const SearchProducts = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get("name");

  useEffect(() => {
    if (nameParam?.length > 0) {
      setSearchText(nameParam);
    }
  }, [nameParam]);

  const productsPageNavigation = () => {
    if (searchText.length > 0) {
      navigate({
        pathname: '/products',
        search: `name=${searchText}`,
      });
    } else {
      navigate("/");
    }
  };

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      productsPageNavigation();
    }
  };

  return (
    <TextField
      id="search-text"
      placeholder="Search All Products"
      type="text"
      size="small"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      onKeyUp={onEnterPress}
      sx={{backgroundColor: "white", borderRadius: "4px", width: '40%'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              aria-label="search"
              sx={{backgroundColor: "#ffc107", '&:hover': {backgroundColor: '#ffb300'}}}
              onClick={productsPageNavigation}>
              <SearchIcon/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};