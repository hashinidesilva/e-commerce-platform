import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box sx={{
      width: '100%',
      minHeight: "30vh",
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CircularProgress color="success" size={50} thickness={6}/>
    </Box>
  );
};