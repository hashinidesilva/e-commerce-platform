import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Card, Typography } from "@mui/material";

export const NoProducts = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        top: '0',
        bottom: '0',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        zIndex: '-1',

      }}>
      <Card sx={{
        width: '60%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <SentimentVeryDissatisfiedIcon sx={{fontSize: 80, marginBottom: 2}}/>
        <Typography variant="h4" component="h2">
          {"Sorry, we couldn't find any results"}
        </Typography>
      </Card>
    </Box>
  );
};